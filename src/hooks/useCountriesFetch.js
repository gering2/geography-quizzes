import { useEffect, useState } from 'react'
import axios from 'axios'

let countriesCache = null
let inflightRequest = null

export const useCountriesFetch = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    if (countriesCache) {
      setCountries(countriesCache)
      setError(null)
      setLoading(false)
      return () => {
        mounted = false
      }
    }

    setLoading(true)
    setError(null)

    const requestPromise =
      inflightRequest ||
      axios
        .get(`${process.env.PUBLIC_URL}/data/countries.json`)
        .then((response) => response.data || [])

    inflightRequest = requestPromise

    requestPromise
      .then((data) => {
        countriesCache = data
        if (mounted) {
          setCountries(data)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err)
          setCountries([])
        }
      })
      .finally(() => {
        inflightRequest = null
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return { countries, loading, error }
}
