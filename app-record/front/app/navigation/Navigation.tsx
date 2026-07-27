import React, { useCallback, useEffect } from 'react'
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '@/hooks/useAuth'
import { TypeRootStackParamsList } from '@/navigation/navigation.type'
import { routes } from '@/navigation/routes'
import BottomMenu from '@/ui/layout/bottomMenu/bottomMenu'
import { TypeNavigate } from '@/ui/layout/bottomMenu/menu.interface'

const Stack = createNativeStackNavigator<TypeRootStackParamsList>()

const Navigation: React.FC = () => {
	const { user } = useAuth()

	const [currentRoute, setCurrentRoute] = React.useState<string | undefined>(
		undefined
	)
	const navRef = useNavigationContainerRef<TypeRootStackParamsList>()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)
		const unsubscribe = navRef.addListener('state', () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)

		return unsubscribe
	}, [])

	const handleNavigate = useCallback<TypeNavigate>(
		screenName => navRef.navigate(screenName),
		[]
	)

	return (
		<>
			<NavigationContainer ref={navRef}>
				<Stack.Navigator /*screenOptions={{ headerShown: false }}*/>
					{routes.map(route => (
						<Stack.Screen key={route.name} {...route} />
					))}
				</Stack.Navigator>
			</NavigationContainer>
			{
				/*user && */ currentRoute && (
					<BottomMenu nav={handleNavigate} currentRoute={currentRoute} />
				)
			}
		</>
	)
}

export default Navigation
