import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Auth: React.FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View>
			<Text>Auth</Text>
			<Pressable onPress={() => navigate('Home')}>
				<Text>To Home</Text>
			</Pressable>
		</View>
	)
}

export default Auth
