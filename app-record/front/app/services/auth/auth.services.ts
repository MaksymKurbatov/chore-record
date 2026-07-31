import { getAuthUrl } from '@/config/api.config'
import { request } from '@/services/api/request.api'
import { saveToStorage } from '@/services/auth/auth.helper'
import { logout } from '@/services/auth/auth.logout'
import { IAuthResponse } from '@/types/auth.interface'

export const AuthService = {
	async main(
		variant: 'reg' | 'login',
		email: string,
		password: string
	): Promise<IAuthResponse> {
		const response = await request<IAuthResponse>({
			url: getAuthUrl(variant === 'reg' ? 'register' : 'login'),
			method: 'POST',
			data: { email, password }
		})

		if (response.accessToken) {
			await saveToStorage(response)
		}

		return response
	},
	logout
}
