import Auth from '@/components/screen/auth/Auth'
import Explore from '@/components/screen/explore/Explore'
import Favorites from '@/components/screen/favorites/Favorites'
import Home from '@/components/screen/home/Home'
import Profile from '@/components/screen/profile/Profile'
import Search from '@/components/screen/search/Search'
import { IRoute } from '@/navigation/navigation.type'

// Списки разделены намеренно: навигатор рендерит либо один, либо другой, и
// именно смена набора экранов переключает приложение между логином и контентом.
// Первый элемент каждого списка становится начальным экраном своей ветки.
export const authRoutes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	}
]

export const privateRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Favorites',
		component: Favorites
	},
	{
		name: 'Explore',
		component: Explore
	},
	{
		name: 'Profile',
		component: Profile
	}
]
