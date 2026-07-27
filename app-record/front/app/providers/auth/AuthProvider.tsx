import React, { PropsWithChildren, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {
	IContext,
	TypeUserState
} from '@/providers/auth/auth-provider.interface'

export const AuthContext = React.createContext({} as IContext)
let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let mounted = true
		const checkAccesToken = async () => {
			try {
			} catch {
			} finally {
				await SplashScreen.hideAsync()
			}
		}
		let ignore = checkAccesToken()
		return () => {
			mounted = false
		}
	}, [])
	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
