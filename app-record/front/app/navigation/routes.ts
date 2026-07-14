import Auth from '@/components/screen/auth/Auth'
import Home from '@/components/screen/home/Home'
import { IRoute } from '@/navigation/navigation.type'

export const routes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Home',
		component: Home
	}
]
