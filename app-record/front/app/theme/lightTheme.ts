import { MD3LightTheme } from 'react-native-paper'
import { colors } from '@/theme/colors'
import { AppTheme } from '@/theme/theme.types'

export const lightTheme: AppTheme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: '#47AA52',
		secondary: '#121212',
		background: '#f6f6f6',
		surface: '#ffffff',
		onSurface: colors.black,
		onBackground: colors.black
	},
	customColors: {
		info: '#3B82F6',
		inactiveIcon: '#6B7280'
	}
}
