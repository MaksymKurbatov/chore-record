import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { IMenuItem, TypeNavigate } from '@/ui/layout/bottomMenu/menu.interface'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
	const isActive = currentRoute === item.path

	return (
		<View style={styles.container}>
			<Pressable onPress={() => nav(item.path)} style={styles.menuItem}>
				<Feather
					name={item.icon}
					size={26}
					color={isActive ? '#47AA52' : '#374151'}
				/>
			</Pressable>
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
