import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import { ThemeProvider, useAppTheme } from '@/theme/ThemeContext'

function AppContent() {
	const { theme, isDark } = useAppTheme()

	return (
		<PaperProvider theme={theme}>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
					<StatusBar style={isDark ? 'light' : 'dark'} />
				</SafeAreaProvider>
			</AuthProvider>
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
