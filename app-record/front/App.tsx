import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import { ThemeProvider, useAppTheme } from '@/theme/ThemeContext'
import Toast from '@/ui/toast/Toast'

// Клиент создаётся один раз на модуль: внутри компонента каждый ререндер
// (например, переключение темы) давал бы новый клиент и сбрасывал весь кеш.
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function AppContent() {
	const { theme, isDark } = useAppTheme()

	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={theme}>
				<AuthProvider>
					<SafeAreaProvider>
						<Navigation />
						<StatusBar style={isDark ? 'light' : 'dark'} />
						<Toast />
					</SafeAreaProvider>
				</AuthProvider>
			</PaperProvider>
		</QueryClientProvider>
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
