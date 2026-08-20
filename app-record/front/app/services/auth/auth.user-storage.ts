import AsyncStorage from '@react-native-async-storage/async-storage'
import { EnumAsyncStorage } from '@/types/auth.interface'
import { IUser } from '@/types/user.interface'

// Профиль хранится в AsyncStorage на всех платформах: он не секрет, а на web у
// AsyncStorage есть настоящая реализация поверх localStorage. Токены — отдельно,
// в платформенных auth.helper.ts / auth.helper.web.ts.

export const getUserFromStorage = async (): Promise<IUser | null> => {
	try {
		const user = await AsyncStorage.getItem(EnumAsyncStorage.USER)
		return user ? (JSON.parse(user) as IUser) : null
	} catch {
		return null
	}
}

export const saveUserToStorage = async (user: IUser) => {
	try {
		await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(user))
	} catch (error) {
		console.warn('Не удалось сохранить пользователя в AsyncStorage:', error)
	}
}

export const deleteUserFromStorage = async () => {
	try {
		await AsyncStorage.removeItem(EnumAsyncStorage.USER)
	} catch (error) {
		console.warn('Не удалось удалить пользователя из AsyncStorage:', error)
	}
}
