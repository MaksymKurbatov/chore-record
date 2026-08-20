// Только переменные с префиксом EXPO_PUBLIC_ попадают в клиентский бандл.
export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL

if (!SERVER_URL) {
	console.warn(
		'EXPO_PUBLIC_SERVER_URL не задан — запросы к API уйдут в никуда. Проверь .env и перезапусти Metro с --clear.'
	)
}

export const API_URL = `${SERVER_URL}/api`

export const REQUEST_TIMEOUT = 15_000

// Во все get*Url путь передаётся без ведущего слэша: getAuthUrl('login').
// Префиксы должны совпадать с @Controller() на сервере — они в единственном
// числе везде, кроме categories.
export const getAuthUrl = (string: string) => `/auth/${string}`
export const getUserUrl = (string: string) => `/user/${string}`
export const getProductUrl = (string: string) => `/product/${string}`
export const getCategoriesUrl = (string: string) => `/categories/${string}`
export const getOrdersUrl = (string: string) => `/orders/${string}`
