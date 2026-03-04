import { useCallback, useEffect, useState } from 'react'

const shuffle = (arr) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export const useCountriesShuffle = (countries) => {
  const [country, setCountry] = useState(null)
  const [queue, setQueue] = useState([])

  useEffect(() => {
    if (!countries || countries.length === 0) {
      setQueue([])
      setCountry(null)
      return
    }

    setQueue(shuffle([...Array(countries.length).keys()]))
    setCountry(null)
  }, [countries])

  const chooseRandomCountry = useCallback(() => {
    setQueue((prevQueue) => {
      if (!countries || countries.length === 0 || prevQueue.length === 0) {
        return prevQueue
      }

      const [nextIndex, ...remaining] = prevQueue
      setCountry(countries[nextIndex])
      return remaining
    })
  }, [countries])

  useEffect(() => {
    if (countries && countries.length > 0 && queue.length === countries.length) {
      chooseRandomCountry()
    }
  }, [countries, queue, chooseRandomCountry])

  return { country, chooseRandomCountry, queueLength: queue.length }
}
