import React from 'react'
import { useEffect, useCallback, useMemo, useState } from 'react'
import CapitalAnswerOptions from './CapitalAnswerOptions'
import Score from '../../components/Score'
import ScoreModal from '../../components/ScoreModal'
import QuizLayout from '../../components/QuizLayout'
import { useQuiz } from '../../hooks/useQuiz'
import { useCountriesShuffle } from '../../hooks/useCountriesShuffle'
import { useCountriesData } from '../../context/CountriesContext'

export default function CapitalQuiz() {
  const quiz = useQuiz(60); // x second quiz (for 20 questions)
  const { countries: fetchedCountries } = useCountriesData()
  const countries = useMemo(
    () =>
      fetchedCountries.filter(
        (item) =>
          item.capital &&
          item.capital.length > 0 &&
          typeof item.population === 'number' &&
          item.population > 1000000
      ),
    [fetchedCountries]
  )
  const { country, chooseRandomCountry } = useCountriesShuffle(countries)
  const [quizAnswers, setQuizAnswers] = useState(new Set())
  const [gameStarted, setGameStarted] = useState(false)
  const NUM_QUESTIONS = 20

  const shuffle = useCallback(function (arr) {
    //shuffle array in place
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  useEffect(() => {
    //when the country is set, generate the other 3 multiple choice answers
    var tempSet = new Set()

    if (country) {
      tempSet.add(country)

      while (tempSet.size < 4) {
        let randomNum = Math.floor(Math.random() * countries.length)
        let randomCountry = countries[randomNum]
        if (randomCountry.capital && randomCountry.capital.length > 0) {
          tempSet.add(randomCountry)
        }
      }

      tempSet = shuffle([...tempSet])
      setQuizAnswers(tempSet)
    }
  }, [country, countries, shuffle])

  const handleResetScore = () => {
    quiz.resetScore()
    setGameStarted(false)
  }

  const totalSecondsLeft = quiz.minutesLeft * 60 + quiz.secondsLeft
  const isUrgent = quiz.activeGame && totalSecondsLeft <= 10
  const timerToneClass = isUrgent
    ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-[0_3px_10px_rgba(245,158,11,0.18)]'
    : quiz.activeGame
      ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-[0_3px_10px_rgba(37,99,235,0.16)]'
      : 'border-slate-300 bg-white text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.06)]'

  return (
    <QuizLayout
      showModal={quiz.showModal}
      children={
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Challenge Mode</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text)]">Guess The Capital</h2>
          </div>

          {!quiz.showModal && country ? (
            <div className={`mb-4 mt-4 inline-flex min-w-[4.5rem] justify-center rounded-full border px-4 py-1.5 font-mono text-sm font-semibold tracking-[0.06em] transition-colors ${timerToneClass}`}>
              {quiz.minutesLeft}:{quiz.secondsLeft < 10 ? '0' : ''}{quiz.secondsLeft}
            </div>
          ) : null}

          {country && !quiz.showModal ? (
            <div className="mb-6 mt-4 flex max-w-full justify-center rounded-[14px] border border-slate-200 bg-slate-50 px-6 py-3 text-center text-xl text-slate-800 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
              What is the capital of&nbsp;<u className="font-bold decoration-slate-400 underline-offset-2">{country.name.common}</u>?
            </div>
          ) : null}

          {country && !quiz.showModal ? (
            <CapitalAnswerOptions
              numberGuessed={quiz.numberGuessed}
              numberCorrect={quiz.numberCorrect}
              setShowModal={quiz.setShowModal}
              NUM_QUESTIONS={NUM_QUESTIONS}
              shuffle={shuffle}
              chooseRandomCountry={chooseRandomCountry}
              country={country}
              quizAnswers={quizAnswers}
              stopGame={quiz.stopGame}
              addToHistory={quiz.addToHistory}
              startGame={quiz.startGame}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
            />
          ) : null}

          {!country && !quiz.showModal ? (
            <div className="mt-6 flex items-center gap-3 text-slate-600">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span>Loading capitals...</span>
            </div>
          ) : null}

          <div className="mt-7">
            <Score numberCorrect={quiz.numberCorrect} numberGuessed={quiz.numberGuessed}></Score>
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
            { key: 'flag', label: 'Country' },
            { key: 'guess', label: 'Guess' },
            { key: 'answer', label: 'Correct Capital' },
            { key: 'result', label: 'Result' },
          ]}
        />
      }
    />
  )
}