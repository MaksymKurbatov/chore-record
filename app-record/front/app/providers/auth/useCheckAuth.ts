import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getNewToken } from '@/services/api/helper.auth'
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper'
import { logout } from '@/services/auth/auth.logout'

export const useCheckAuth = (routeName?: string) => {
	const { user } = useAuth()

	// На старте приложения обновляем пару токенов: access живёт сутки и к моменту
	// запуска мог протухнуть. Разлогиниваем только при явном отказе сервера —
	// при сетевой ошибке сессию оставляем, юзер может быть просто оффлайн.
	useEffect(() => {
		const checkAccessToken = async () => {
			const accessToken = await getAccessToken()
			if (!accessToken) return

			const result = await getNewToken()
			if (!result.ok && result.reason !== 'network') await logout()
		}

		void checkAccessToken()
	}, [])

	// Страховка на смене экрана: если refresh-токен исчез из хранилища мимо
	// logout() (например, стор почистили извне), приводим React-стейт в
	// соответствие. Штатный путь разлогина идёт через logout() и onLogout.
	useEffect(() => {
		if (!user) return

		let isMounted = true

		const checkRefreshToken = async () => {
			const refreshToken = await getRefreshToken()
			if (isMounted && !refreshToken) await logout()
		}

		void checkRefreshToken()

		return () => {
			isMounted = false
		}
	}, [user])
}
