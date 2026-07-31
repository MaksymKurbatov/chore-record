import React, { PropsWithChildren, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {
	IContext,
	TypeUserState
} from '@/providers/auth/auth-provider.interface'
import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'
import { onLogout } from '@/services/auth/auth.logout'

export const AuthContext = React.createContext({} as IContext)
void SplashScreen.preventAutoHideAsync()

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let isMounted = true
		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken()
				if (accessToken) {
					const user = await getUserFromStorage()
					if (isMounted) setUser(user)
				}
			} catch (error) {
				console.warn('Не удалось восстановить сессию:', error)
			} finally {
				await SplashScreen.hideAsync()
			}
		}
		void checkAccessToken()
		return () => {
			isMounted = false
		}
	}, [])

	// Разлогин может прийти из сервисного слоя (интерцептор, useCheckAuth) —
	// это единственное место, где он превращается в сброс React-стейта.
	useEffect(() => onLogout(() => setUser(null)), [])
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
