import { createContext, useContext, useMemo } from 'react'
import { useCountriesFetch } from '../hooks/useCountriesFetch'

const CountriesContext = createContext(null)

export const CountriesProvider = ({ children }) => {
  const { countries, loading, error } = useCountriesFetch()

  const value = useMemo(
    () => ({ countries, loading, error }),
    [countries, loading, error]
  )

  return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>
}

export const useCountriesData = () => {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error('useCountriesData must be used within CountriesProvider')
  }
  return context
}
