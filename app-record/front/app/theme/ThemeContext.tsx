import React, { createContext, useContext, useState } from 'react'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'
import { BASE_THEME, AppTheme } from './theme'

type ThemeContextType = {
	theme: AppTheme
	isDark: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [isDark, setIsDark] = useState(BASE_THEME === 'dark')
	debugger

	const toggleTheme = () => setIsDark(prev => !prev)

	const theme = isDark ? darkTheme : lightTheme

	return (
		<ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useAppTheme = () => useContext(ThemeContext)
