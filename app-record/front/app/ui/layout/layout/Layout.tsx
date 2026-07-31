import { FC, PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

interface ILayout {
	style?: object
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, style }) => {
	return (
		<View style={[styles.container, style]}>
			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // h-full w-full
		backgroundColor: '#fff', // bg-white
		marginTop: 64 // mt-16 (16 * 4px)
	}
})

export default Layout
