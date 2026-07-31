import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.services'
import Heading from '@/ui/heading/Heading'
import Layout from '@/ui/layout/layout/Layout'
import StyledButton from '@/ui/styledButton/styledButton'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { setUser } = useAuth()
	const { profile } = useProfile()

	return (
		<Layout>
			<Heading isCenter>Profile</Heading>

			<View style={styles.avatarContainer}>
				<Image source={{ uri: profile?.avatarPath }} style={styles.avatar} />
			</View>

			<View style={styles.buttonContainer}>
				<StyledButton
					onPress={() => AuthService.logout().then(() => setUser(null))}
				>
					Logout
				</StyledButton>
			</View>
		</Layout>
	)
}

const styles = StyleSheet.create({
	avatarContainer: {
		marginVertical: 24, // my-6
		alignItems: 'center', // items-center
		justifyContent: 'center' // justify-center
	},
	avatar: {
		width: 160, // w-40
		height: 160, // h-40
		borderRadius: 80 // rounded-full
	},
	buttonContainer: {
		paddingHorizontal: 24,
		marginTop: 20 // mt-5
	}
})

export default Profile
