import type {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions
} from 'react-hook-form'
import type { TextInputProps } from 'react-native-paper'

export interface IField<T extends FieldValues> extends Omit<
	TextInputProps,
	'onChange' | 'onChangeText' | 'value' | 'error'
> {
	control: Control<T>
	name: FieldPath<T>
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
