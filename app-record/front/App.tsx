import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import Navigation from '@/navigation/Navigation'
import { ThemeProvider, useAppTheme } from '@/theme/ThemeContext'

function AppContent() {
	const { theme, isDark } = useAppTheme()

	return (
		<PaperProvider theme={theme}>
			<SafeAreaProvider>
				<Navigation />
				<StatusBar style={isDark ? 'light' : 'dark'} />
			</SafeAreaProvider>
		</PaperProvider>
	)
}

export default function App() {
	return (
		<ThemeProvider>
			<AppContent />
		</ThemeProvider>
	)
}

/*const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})*/
