import { IUser } from '@/types/user.interface'

export type IAuthFormData = Pick<IUser, 'email' | 'password'>
