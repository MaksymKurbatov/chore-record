import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<Text>Homeoooooooo</Text>
			</SafeAreaProvider>
			<StatusBar style='auto' />
		</>
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
