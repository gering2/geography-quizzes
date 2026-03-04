import { useEffect, useState } from 'react'
import axios from 'axios'

const countriesCache = new Map()
const inflightRequests = new Map()

const normalizeFields = (fields) => {
  if (Array.isArray(fields)) {
    return fields.map((f) => `${f}`.trim()).filter(Boolean).join(',')
  }
  return `${fields || ''}`.trim()
}

export const useCountriesFetch = (fields) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const normalizedFields = normalizeFields(fields)

    if (!normalizedFields) {
      setCountries([])
      setError(new Error('fields is required for /v3.1/all endpoint'))
      setLoading(false)
      return () => {
        mounted = false
      }
    }

    if (countriesCache.has(normalizedFields)) {
      setCountries(countriesCache.get(normalizedFields))
      setError(null)
      setLoading(false)
      return () => {
        mounted = false
      }
    }

    setLoading(true)
    setError(null)

    const existingPromise = inflightRequests.get(normalizedFields)
    const requestPromise =
      existingPromise ||
      axios
        .get(`https://restcountries.com/v3.1/all?fields=${encodeURIComponent(normalizedFields)}`)
        .then((response) => response.data || [])

    if (!existingPromise) {
      inflightRequests.set(normalizedFields, requestPromise)
    }

    requestPromise
      .then((data) => {
        countriesCache.set(normalizedFields, data)
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
        inflightRequests.delete(normalizedFields)
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [fields])

  return { countries, loading, error }
}
