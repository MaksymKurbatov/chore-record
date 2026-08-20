import { isAxiosError } from 'axios'

// EXPO_PUBLIC_SERVER_URL в .env (IP машины меняется при переподключении к Wi-Fi).
const CONNECTION_ERRORS: Record<string, string> = {
	ECONNABORTED: 'The server did not respond in time. Check your connection.',
	ETIMEDOUT: 'The server did not respond in time. Check your connection.',
	ERR_NETWORK:
		'There is no connection to the server. Check your internet connection and server address.'
}

export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	if (message) {
		return typeof message === 'object' ? message[0] : message
	}

	if (isAxiosError(error) && !error.response && error.code) {
		const connectionError = CONNECTION_ERRORS[error.code]
		if (connectionError) return connectionError
	}

	return error.message
}
