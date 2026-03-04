import { useCallback, useEffect, useState } from 'react'

const getRandomPair = (countries) => {
  if (!countries || countries.length < 2) {
    return [null, null]
  }

  const firstIndex = Math.floor(Math.random() * countries.length)
  let secondIndex = Math.floor(Math.random() * countries.length)

  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * countries.length)
  }

  return [countries[firstIndex], countries[secondIndex]]
}

export const useCountryPair = (countries) => {
  const [pair, setPair] = useState([null, null])

  const nextPair = useCallback(() => {
    setPair(getRandomPair(countries))
  }, [countries])

  useEffect(() => {
    nextPair()
  }, [nextPair])

  return {
    pair,
    nextPair,
    hasPair: Boolean(pair[0] && pair[1]),
  }
}
