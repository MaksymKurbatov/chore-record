import { Controller, type FieldValues } from 'react-hook-form'
import { HelperText, TextInput } from 'react-native-paper'
import type { IField } from './field.interface'

function Field<T extends FieldValues>({
	control,
	name,
	rules,
	...inputProps
}: IField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<>
					<TextInput
						{...inputProps}
						value={field.value == null ? '' : String(field.value)}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						error={Boolean(fieldState.error)}
					/>

					<HelperText type='error' visible={Boolean(fieldState.error)}>
						{fieldState.error?.message}
					</HelperText>
				</>
			)}
		/>
	)
}

export default Field
