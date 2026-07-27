import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '@/components/screen/auth/Auth'
import { useAuth } from '@/hooks/useAuth'
import { TypeRootStackParamsList } from '@/navigation/navigation.type'
import { routes } from '@/navigation/routes'

const Stack = createNativeStackNavigator<TypeRootStackParamsList>()

const PrivateNavigation: React.FC = () => {
	const { user } = useAuth()
	console.log(user)
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#fff'
				}
			}}
		>
			{user ? (
				routes.map(route => <Stack.Screen key={route.name} {...route} />)
			) : (
				<Stack.Screen name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
