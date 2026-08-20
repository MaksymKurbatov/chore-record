import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import { EnumSecureStore, IAuthResponse, IToken } from '@/types/auth.interface'
import { saveUserToStorage } from './auth.user-storage'

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

export const saveToStorage = async (data: IAuthResponse) => {
	await saveTokenStorage(data)
	await saveUserToStorage(data.user)
}

export { getUserFromStorage } from './auth.user-storage'
