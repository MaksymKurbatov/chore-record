import { StyleSheet } from 'react-native';
import { Button, type ButtonProps } from 'react-native-paper';













type StyledButtonProps = ButtonProps

const StyledButton: React.FC<StyledButtonProps> = ({
	children,
	style,
	labelStyle,
	mode = 'contained',
	...props
}) => {
	return (
		<Button
			{...props}
			mode={mode}
			style={[styles.button, style]}
			labelStyle={[styles.text, labelStyle]}
		>
			{children}
		</Button>
	)
}
const styles = StyleSheet.create({
	button: {
		alignSelf: 'center',
		marginTop: 14,
		width: '100%',
		borderRadius: 8
	},
	text: {
		fontWeight: '300',
		fontSize: 18,
		lineHeight: 28,
		textAlign: 'center'
	}
})

export default StyledButton
