import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import { useCountriesData } from '../../context/CountriesContext'
import { useQuiz } from '../../hooks/useQuiz'
import { useCountryPair } from '../../hooks/useCountryPair'
import QuizLayout from '../../components/QuizLayout'
import Score from '../../components/Score'
import ScoreModal from '../../components/ScoreModal'

export default function PopulationQuiz() {
  const quiz = useQuiz()
  const { countries: allCountries, loading, error } = useCountriesData()
  const countries = useMemo(
    () =>
      allCountries.filter(
        (country) =>
          country.name?.common &&
          typeof country.population === 'number' &&
          country.population > 1000000
      ),
    [allCountries]
  )
  const { pair, nextPair, hasPair } = useCountryPair(countries)
  const answerUnlockTimerRef = useRef(null)
  const NUM_QUESTIONS = 20
  const [isResolvingAnswer, setIsResolvingAnswer] = useState(false)
  const [showPopulationReveal, setShowPopulationReveal] = useState(false)
  const [selectedCountryName, setSelectedCountryName] = useState(null)
  const [correctCountryName, setCorrectCountryName] = useState(null)

  const [leftCountry, rightCountry] = pair

  const handleResetScore = useCallback(() => {
    quiz.resetScore()
    setIsResolvingAnswer(false)
    setShowPopulationReveal(false)
    setSelectedCountryName(null)
    setCorrectCountryName(null)
    if (answerUnlockTimerRef.current) {
      clearTimeout(answerUnlockTimerRef.current)
      answerUnlockTimerRef.current = null
    }
    nextPair()
  }, [quiz, nextPair])

  const handlePick = useCallback(
    (chosenCountry) => {
      if (!hasPair || isResolvingAnswer || quiz.showModal) {
        return
      }

      const guessedBeforePick = quiz.activeGame ? quiz.numberGuessed : 0

      if (!quiz.activeGame) {
        quiz.startGame()
      }

      setIsResolvingAnswer(true)

      const correctCountry =
        leftCountry.population >= rightCountry.population ? leftCountry : rightCountry
      const isCorrect = chosenCountry.name.common === correctCountry.name.common
      const matchup = `${leftCountry.name.common} vs ${rightCountry.name.common}`

      setSelectedCountryName(chosenCountry.name.common)
      setCorrectCountryName(correctCountry.name.common)
      setShowPopulationReveal(true)

      quiz.addToHistory(chosenCountry.name.common, correctCountry.name.common, matchup, isCorrect)

      const nextCount = guessedBeforePick + 1

      if (answerUnlockTimerRef.current) {
        clearTimeout(answerUnlockTimerRef.current)
      }

      answerUnlockTimerRef.current = setTimeout(() => {
        if (nextCount >= NUM_QUESTIONS) {
          quiz.setShowModal(true)
        } else {
          setShowPopulationReveal(false)
          setSelectedCountryName(null)
          setCorrectCountryName(null)
          nextPair()
        }
        setIsResolvingAnswer(false)
        answerUnlockTimerRef.current = null
      }, 1000)
    },
    [hasPair, isResolvingAnswer, quiz, leftCountry, rightCountry, nextPair]
  )

  const getButtonClassName = (countryName) => {
    if (!showPopulationReveal) {
      return 'w-72 rounded-[14px] border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md active:translate-y-0 active:scale-[0.99]'
    }

    if (countryName === correctCountryName) {
      return 'w-72 rounded-[14px] border border-emerald-200 bg-emerald-100 px-5 py-3.5 font-semibold text-emerald-800 shadow-sm transition-all'
    }

    return 'w-72 rounded-[14px] border border-rose-200 bg-rose-100 px-5 py-3.5 font-semibold text-rose-800 shadow-sm transition-all'
  }

  useEffect(() => {
    return () => {
      if (answerUnlockTimerRef.current) {
        clearTimeout(answerUnlockTimerRef.current)
      }
    }
  }, [])

  return (
    <QuizLayout
      showModal={quiz.showModal}
      children={
        <div className="mt-4 flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Challenge Mode</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text)]">Population Quiz</h1>
          </div>

          <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold tracking-[0.02em] text-blue-900 shadow-[0_3px_10px_rgba(37,99,235,0.16)]">
            Choose the country with the larger population
          </div>

          {loading ? <p className="text-slate-600">Loading countries...</p> : null}
          {error ? <p className="text-[#b0433f]">Failed to load countries.</p> : null}

          {!loading && !error && hasPair ? (
            <div className="mt-7 flex w-full flex-col items-center gap-4">
              <button
                disabled={isResolvingAnswer}
                onClick={() => handlePick(leftCountry)}
                className={getButtonClassName(leftCountry.name.common)}
              >
                {leftCountry.name.common}
              </button>

              <div className="h-6 text-sm text-slate-700 font-medium">
                {showPopulationReveal ? leftCountry.population.toLocaleString() : ''}
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">VS</span>

              <button
                disabled={isResolvingAnswer}
                onClick={() => handlePick(rightCountry)}
                className={getButtonClassName(rightCountry.name.common)}
              >
                {rightCountry.name.common}
              </button>

              <div className="h-6 text-sm text-slate-700 font-medium">
                {showPopulationReveal ? rightCountry.population.toLocaleString() : ''}
              </div>
            </div>
          ) : null}

          <div className="mt-1">
            <Score numberCorrect={quiz.numberCorrect} numberGuessed={quiz.numberGuessed} />
          </div>
        </div>
      }
      modal={
        <ScoreModal
          resetScore={handleResetScore}
          numberCorrect={quiz.numberCorrect}
          numberGuessed={quiz.numberGuessed}
          setShowModal={quiz.setShowModal}
          guessHistory={quiz.guessHistory}
          columns={[
            { key: 'flag', label: 'Matchup' },
            { key: 'guess', label: 'Your Pick' },
            { key: 'answer', label: 'Higher Population' },
            { key: 'result', label: 'Result' },
          ]}
        />
      }
    />
  )
}