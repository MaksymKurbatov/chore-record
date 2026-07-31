import { IUser } from '@/types/user.interface'

export type IAuthFormData = Pick<IUser, 'email' | 'password'>

export enum EnumSecureStore {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export enum EnumAsyncStorage {
	USER = 'user'
}

export interface IToken {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends IToken {
	user: IUser
}

/**
 * Причина, по которой не удалось обновить пару токенов.
 * 'network' — временный сбой (сеть, 5xx): разлогинивать НЕЛЬЗЯ.
 * 'no-token' / 'rejected' — сессии больше нет: нужно разлогинить.
 */
export type TypeRefreshFailure = 'no-token' | 'rejected' | 'network'

export type TypeRefreshResult =
	| { ok: true; data: IAuthResponse }
	| { ok: false; reason: TypeRefreshFailure }
