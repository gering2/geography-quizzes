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

  return (
    <QuizLayout
      showModal={quiz.showModal}
      children={
        <div className="justify-center items-center flex flex-col">
          <div className="text-center">
            <h2 className="text-black text-3xl font-bold tracking-tight">Guess The Capital</h2>
          </div>

          {!quiz.showModal && country ? (
            <div className="mb-4 mt-4 px-4 py-1.5 border border-indigo-100 rounded-full bg-indigo-50 text-indigo-700 shadow-sm font-medium">
              {quiz.minutesLeft}:{quiz.secondsLeft < 10 ? '0' : ''}{quiz.secondsLeft}
            </div>
          ) : null}

          {country && !quiz.showModal ? (
            <div className="flex justify-center text-center mt-2 mb-6 text-white bg-gradient-to-r from-indigo-600 to-blue-600 px-6 rounded-xl py-3 text-xl shadow-lg max-w-full border border-indigo-500/30">
              What is the capital of&nbsp;<u className="font-bold decoration-indigo-100 underline-offset-2">{country.name.common}</u>?
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
            <div className="mt-6 flex items-center gap-3 text-gray-600">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span>Loading capitals...</span>
            </div>
          ) : null}

          <div className="mt-6">
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