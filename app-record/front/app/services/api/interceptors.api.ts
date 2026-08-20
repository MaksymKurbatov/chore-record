import axios, { InternalAxiosRequestConfig } from 'axios'
import { API_URL, REQUEST_TIMEOUT } from '@/config/api.config'
import { errorCatch } from '@/services/api/error.api'
import { getNewToken } from '@/services/api/helper.auth'
import { getAccessToken } from '@/services/auth/auth.helper'
import { logout } from '@/services/auth/auth.logout'

declare module 'axios' {
	interface InternalAxiosRequestConfig {
		_isRetry?: boolean
	}
}

const instance = axios.create({
	baseURL: API_URL,
	timeout: REQUEST_TIMEOUT,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const accessToken = await getAccessToken()

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	}
)

instance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		// error.response нет при сетевой ошибке/таймауте — без ?. обработчик
		// ошибок падал бы сам и подменял исходную ошибку на TypeError.
		const status = error.response?.status
		const message = errorCatch(error)

		if (
			(status === 401 ||
				message === 'jwt expired' ||
				message === 'jwt must be provided') &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true

			const result = await getNewToken()

			// Ретраим только если токен реально обновился, иначе уйдёт второй
			// запрос со старым токеном и гарантированным 401.
			if (result.ok) return instance.request(originalRequest)

			// Сеть отвалилась — сессия может быть жива, разлогинивать рано.
			if (result.reason !== 'network') await logout()
		}

		throw error
	}
)

export default instance
