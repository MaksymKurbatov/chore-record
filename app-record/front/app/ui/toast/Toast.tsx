import { FC } from 'react'
import RnToast, { BaseToast, BaseToastProps } from 'react-native-toast-message'

const getOptions = (primaryColor: string) => ({
	style: {
		backgroundColor: '#080808',
		borderLeftColor: primaryColor
	},
	text1Style: {
		color: '#fff',
		fontSize: 16
	},
	text2Style: {
		color: '#fff',
		fontSize: 14
	}
})

const renderToast = (props: BaseToastProps, primaryColor: string) => (
	<BaseToast {...props} {...getOptions(primaryColor)} />
)

const Toast: FC = () => {
	return (
		<RnToast
			topOffset={50}
			config={{
				success: props => renderToast(props, '#67E769'),
				info: props => renderToast(props, '#65D4FF'),
				error: props => renderToast(props, '#FF4949')
			}}
		/>
	)
}

export default Toast
