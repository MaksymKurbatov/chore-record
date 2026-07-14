import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TypeRootStackParamsList } from '@/navigation/navigation.type'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParamsList>>()
