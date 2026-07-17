import { MD3LightTheme } from 'react-native-paper'
import { colors } from '@/theme/colors'

export const lightTheme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: '#47AA52',
		secondary: '#121212',
		background: '#f6f6f6',
		surface: '#ffffff',
		onSurface: colors.white,
		onBackground: colors.black
	},
}
