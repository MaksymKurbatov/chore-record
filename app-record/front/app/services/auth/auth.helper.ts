import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import {
	EnumAsyncStorage,
	EnumSecureStore,
	IAuthResponse,
	IToken
} from '@/types/auth.interface'
import { IUser } from '@/types/user.interface'

export const getAccessToken = async () =>
	getItemAsync(EnumSecureStore.ACCESS_TOKEN)

export const getRefreshToken = async () =>
	getItemAsync(EnumSecureStore.REFRESH_TOKEN)

export const saveTokenStorage = async (data: IToken) => {
	await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.accessToken)
	await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refreshToken)
}

export const deleteTokenStorage = async () => {
	await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)
	await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)
}

export const getUserFromStorage = async (): Promise<IUser | null> => {
	try {
		const user = await AsyncStorage.getItem(EnumAsyncStorage.USER)
		return user ? (JSON.parse(user) as IUser) : null
	} catch {
		return null
	}
}

export const saveToStorage = async (data: IAuthResponse) => {
	await saveTokenStorage(data)
	try {
		await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(data.user))
	} catch (error) {
		console.warn('Не удалось сохранить пользователя в AsyncStorage:', error)
	}
}
