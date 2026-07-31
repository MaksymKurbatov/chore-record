import axios, { isAxiosError } from 'axios'
import { API_URL, getAuthUrl } from '@/config/api.config'
import { getRefreshToken, saveToStorage } from '@/services/auth/auth.helper'
import { IAuthResponse, TypeRefreshResult } from '@/types/auth.interface'

// Обновление токенов идёт мимо instance из interceptors.api: иначе 401 на самом
// refresh снова дёрнул бы интерцептор и получилась бы рекурсия.
let inFlight: Promise<TypeRefreshResult> | null = null

const requestNewToken = async (): Promise<TypeRefreshResult> => {
	const refreshToken = await getRefreshToken()

	if (!refreshToken) return { ok: false, reason: 'no-token' }

	try {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('login/access-token')}`,
			{ refreshToken },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		if (!response.data.accessToken) return { ok: false, reason: 'rejected' }

		await saveToStorage(response.data)

		return { ok: true, data: response.data }
	} catch (error) {
		const status = isAxiosError(error) ? error.response?.status : undefined

		// Только явный отказ сервера означает мёртвую сессию. Отсутствие ответа
		// (нет сети) и 5xx — временные сбои, при них сессию сохраняем.
		const isRejected =
			status !== undefined &&
			status >= 400 &&
			status < 500 &&
			status !== 408 &&
			status !== 429

		if (!isRejected) {
			console.warn('Не удалось обновить токен:', error)
		}

		return { ok: false, reason: isRejected ? 'rejected' : 'network' }
	}
}

/**
 * Обменивает refresh-токен на новую пару. Параллельные вызовы (например, старт
 * приложения + несколько запросов, получивших 401) переиспользуют один запрос,
 * иначе несколько ответов наперегонки пишут в SecureStore.
 */
export const getNewToken = async (): Promise<TypeRefreshResult> => {
	inFlight ??= requestNewToken().finally(() => {
		inFlight = null
	})

	return inFlight
}
