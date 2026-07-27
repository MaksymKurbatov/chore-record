import { TypeRootStackParamsList } from '@/navigation/navigation.type'
import { TypeFeatherIconName } from '@/types/icon.interface'

export interface IMenuItem {
	icon: TypeFeatherIconName
	path: keyof TypeRootStackParamsList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamsList) => void
