import { ComponentType } from 'react'

export type TypeRootStackParamsList = {
	Auth: undefined
	Home: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamsList
	component: ComponentType
}
