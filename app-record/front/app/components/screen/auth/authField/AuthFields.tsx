import { FC } from 'react'
import { Control } from 'react-hook-form'
import { validEmail } from '@/components/screen/auth/email.regex'
import { IAuthFormData } from '@/types/auth.interface'
import Field from '@/ui/field/Field'

interface IAuthFields {
	control: Control<IAuthFormData>
}

const AuthFields: FC<IAuthFields> = ({ control }) => {
	return (
		<>
			<Field<IAuthFormData>
				control={control}
				name='email'
				label='Email'
				keyboardType='email-address'
				autoCapitalize='none'
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email'
					}
				}}
			/>

			<Field<IAuthFormData>
				control={control}
				name='password'
				label='Password'
				secureTextEntry
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password must contain at least 6 characters'
					}
				}}
			/>
		</>
	)
}

export default AuthFields
