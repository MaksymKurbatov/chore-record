import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteTokenStorage } from '@/services/auth/auth.helper'
import { EnumAsyncStorage } from '@/types/auth.interface'

type TypeLogoutListener = () => void

const listeners = new Set<TypeLogoutListener>()

/**
 * Подписка на разлогин. Нужна, чтобы logout() из сервисного слоя (интерцептор,
 * useCheckAuth) мог сбросить user в AuthContext, не импортируя React-код.
 * Возвращает функцию отписки.
 */
export const onLogout = (listener: TypeLogoutListener) => {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

/**
 * Единственная точка разлогина: чистит токены, профиль и React-стейт.
 * Живёт отдельно от auth.services, чтобы не тянуть за собой request.api
 * и не создавать цикл импортов с интерцептором.
 */
export const logout = async () => {
	await deleteTokenStorage()
	await AsyncStorage.removeItem(EnumAsyncStorage.USER)
	listeners.forEach(listener => listener())
}
