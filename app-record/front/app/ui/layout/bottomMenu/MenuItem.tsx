import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { IconButton, useTheme } from 'react-native-paper'
import { AppTheme } from '@/theme/theme'
import { IMenuItem, TypeNavigate } from '@/ui/layout/bottomMenu/menu.interface'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}
const MenuItem: React.FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
	//const { customColors } = useTheme<AppTheme>()
	const { colors } = useTheme<AppTheme>()

	const isActive = currentRoute === item.path

	return (
		<View style={styles.container}>
			<IconButton
				onPress={() => nav(item.path)}
				icon={({ size, color }) => (
					<Feather name={item.icon} size={size} color={color} />
				)}
				iconColor={isActive ? colors.primary : colors.onSurface}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '20%',
		alignItems: 'center'
	},
	menuItem: {
		width: '100%',
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default MenuItem
