import { ComponentType } from 'react'

export type TypeRootStackParamsList = {
	Auth: undefined
	Home: undefined
	Favorites: undefined
	Search: undefined
	Explore: undefined
	Profile: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamsList
	component: ComponentType
}
