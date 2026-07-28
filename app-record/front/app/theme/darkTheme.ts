import { MD3DarkTheme } from 'react-native-paper'
import { AppTheme } from '@/theme/theme.types'

export const darkTheme: AppTheme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: '#FF0000',
		secondary: '#03dac6',
		background: '#121212',
		surface: '#1e1e1e'
	},
	customColors: {
		info: '#3B82F6',
		inactiveIcon: '#9CA3AF'
	}
}
