import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MenuItem from '@/ui/layout/bottomMenu/MenuItem'
import { menuItems } from '@/ui/layout/bottomMenu/menu.data'
import { TypeNavigate } from '@/ui/layout/bottomMenu/menu.interface'
import { useTheme } from 'react-native-paper'
import { AppTheme } from '@/theme/theme'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: React.FC<IBottomMenu> = props => {
	const { bottom } = useSafeAreaInsets()
	const { colors } = useTheme<AppTheme>()

	return (
		<View
			style={[
				styles.container,
				{
					paddingBottom: bottom + 8,
					backgroundColor: colors.surface,
					borderTopColor: colors.outlineVariant
				}
			]}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...props} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
		paddingHorizontal: 8,
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderTopWidth: 1,
		borderTopColor: '#bbbbbb',
		backgroundColor: '#fff'
	}
})

export default BottomMenu
