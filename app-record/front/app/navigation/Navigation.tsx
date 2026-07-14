import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TypeRootStackParamsList } from '@/navigation/navigation.type'
import { routes } from '@/navigation/routes'

const Stack = createNativeStackNavigator<TypeRootStackParamsList>()

const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator /*screenOptions={{ headerShown: false }}*/>
				{routes.map(route => (
					<Stack.Screen key={route.name} {...route} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
