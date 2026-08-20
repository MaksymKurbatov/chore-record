import AsyncStorage from '@react-native-async-storage/async-storage'
import { EnumSecureStore, IAuthResponse, IToken } from '@/types/auth.interface'
import { saveUserToStorage } from './auth.user-storage'

// Web-версия auth.helper. Metro подставляет её вместо auth.helper.ts при сборке
// под web — импорты '@/services/auth/auth.helper' менять не нужно.
//
// expo-secure-store на web — пустая заглушка (build/ExpoSecureStore.web.js
// экспортирует {}), потому что в браузере нет аналога Keychain / Android
// Keystore. Любой её метод падает с "is not a function", поэтому здесь токены
// лежат в AsyncStorage, то есть в localStorage.
//
// ВАЖНО: это НЕ безопасное хранилище — токен в localStorage читает любой XSS.
// Для боевого web правильный путь — refresh-токен в httpOnly cookie с сервера;
// сейчас NestJS отдаёт обе строки в теле ответа, так что это отдельная задача.

export const getAccessToken = async () => {
	try {
		return await AsyncStorage.getItem(EnumSecureStore.ACCESS_TOKEN)
	} catch {
		return null
	}
}

export const getRefreshToken = async () => {
	try {
		return await AsyncStorage.getItem(EnumSecureStore.REFRESH_TOKEN)
	} catch {
		return null
	}
}

export const saveTokenStorage = async (data: IToken) => {
	await AsyncStorage.multiSet([
		[EnumSecureStore.ACCESS_TOKEN, data.accessToken],
		[EnumSecureStore.REFRESH_TOKEN, data.refreshToken]
	])
}

export const deleteTokenStorage = async () => {
	await AsyncStorage.multiRemove([
		EnumSecureStore.ACCESS_TOKEN,
		EnumSecureStore.REFRESH_TOKEN
	])
}

export const saveToStorage = async (data: IAuthResponse) => {
	await saveTokenStorage(data)
	await saveUserToStorage(data.user)
}

export { getUserFromStorage } from './auth.user-storage'
