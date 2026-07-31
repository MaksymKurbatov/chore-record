import { FC, PropsWithChildren } from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

interface IHeading {
	isCenter?: boolean
	style?: TextStyle
}

const Heading: FC<PropsWithChildren<IHeading>> = ({
	children,
	isCenter = false,
	style
}) => {
	return (
		<Text style={[styles.heading, isCenter && styles.center, style]}>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	heading: {
		color: '#000', // text-black
		fontWeight: '500', // font-medium
		fontSize: 20 // text-xl
	},
	center: {
		textAlign: 'center'
	}
})

export default Heading
