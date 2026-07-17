import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MD3Theme, useTheme } from 'react-native-paper'
type AuthSwitcherProps = {
	isLogin: boolean
	onPress: () => void
}

const AuthSwitcher: React.FC<AuthSwitcherProps> = ({ isLogin, onPress }) => {
	const theme = useTheme()
	const styles = createStyles(theme)
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{isLogin ? "Don't have an account?" : 'Already have an account?'}
			</Text>

			<Pressable onPress={onPress}>
				<Text style={styles.link}>{isLogin ? 'Sign Up' : 'Login'}</Text>
			</Pressable>
		</View>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 20
		},
		text: {
			fontSize: 16
		},
		link: {
			marginLeft: 4,
			fontSize: 16,
			fontWeight: '600',
			color: theme.colors.primary
		}
	})

export default AuthSwitcher
