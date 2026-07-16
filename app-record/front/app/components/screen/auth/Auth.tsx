import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import {Button} from "react-native-paper";

const Auth: React.FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View>
			<Text>Auth</Text>
			<Pressable onPress={() => navigate('Home')}>
				<Text>To Home</Text>
				<Button mode="contained">ON</Button>
			</Pressable>
		</View>
	)
}

export default Auth
