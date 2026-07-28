import { MD3Theme } from 'react-native-paper'

export interface CustomColors {
	info: string
	inactiveIcon: string
}

export type AppTheme = MD3Theme & {
	customColors: CustomColors
}
