import React from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { type SubmitHandler, useForm } from 'react-hook-form'
import AuthFields from '@/components/screen/auth/authField/AuthFields'
import AuthSwitcher from '@/components/screen/auth/authSwitcher/AuthSwitcher'
import { useAuthMutations } from '@/components/screen/auth/useAuthMutation'
import type { IAuthFormData } from '@/types/auth.interface'
import Loader from '@/ui/loader/Loader'
import StyledButton from '@/ui/styledButton/styledButton'

const Auth: React.FC = () => {
	const [isReg, setIsReg] = React.useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})
	const { isLoading, loginSync, registerSync } = useAuthMutations(reset)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={0}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.box}>
					<Text style={styles.loginText}>{isReg ? 'Sign Up' : 'Login'}</Text>

					{isLoading ? (
						<Loader />
					) : (
						<View>
							<AuthFields control={control} />

							<StyledButton
								onPress={handleSubmit(onSubmit)}
								loading={isLoading}
								disabled={isLoading}
							>
								{isReg ? 'Sign Up' : 'Login'}
							</StyledButton>

							<AuthSwitcher
								isLogin={!isReg}
								onPress={() => setIsReg(previous => !previous)}
							/>
						</View>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 24
	},
	box: {
		width: '75%'
	},
	loginText: {
		marginBottom: 32,
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '500',
		color: '#000000'
	}
})

export default Auth
