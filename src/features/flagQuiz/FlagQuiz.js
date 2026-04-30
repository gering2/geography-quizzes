
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import GuessInput from '../../components/GuessInput';
import FlagQuizContent from './FlagQuizContent';
import QuizLayout from '../../components/QuizLayout';
import ScoreModal from '../../components/ScoreModal';
import { useQuiz } from '../../hooks/useQuiz';
import { useCountriesShuffle } from '../../hooks/useCountriesShuffle';
import { useCountriesData } from '../../context/CountriesContext';

export default function FlagQuiz() {
  const quiz = useQuiz(60); // 60 second quiz
  const { countries: allCountries } = useCountriesData()
  const countries = useMemo(
    () =>
      allCountries.filter(
        (item) =>
          item.altSpellings &&
          item.flags &&
          item.name &&
          typeof item.population === 'number' &&
          item.population > 1000000
      ),
    [allCountries]
  )
  const { country, chooseRandomCountry } = useCountriesShuffle(countries)
  const [flagText, setFlagText] = useState('')
  // name of the most recent incorrect/correct guess (shown briefly)
  const [missedName, setMissedName] = useState('')
  const [correctName, setCorrectName] = useState('')
  const submitLockRef = useRef(false)
  const submitUnlockTimerRef = useRef(null)
  const handleInputChange = function(e) {
    setFlagText(e.target.value)
  }

  const checkGuess = useCallback(function (guess) {
    if (!country || !guess || !guess.trim()) {
      return;
    }
    const normalizedGuess = guess.trim().toLowerCase();
    let lowerAltSpellings = country.altSpellings?.map((country) => {
      return country.toLowerCase() ?? [];
    })
    const isCorrect =
      normalizedGuess === country.name.common.toLowerCase() ||
      lowerAltSpellings.includes(normalizedGuess);
    if (isCorrect) {
      setCorrectName(country.name.common);
      setTimeout(() => setCorrectName(''), 2000);
    } else {
      setMissedName(country.name.common);
      setTimeout(() => setMissedName(''), 2000);
    }
    quiz.addToHistory(guess.trim(), country.name.common, country.flags.png, isCorrect);
    chooseRandomCountry();
  }, [country, quiz, chooseRandomCountry])

  const checkForSubmit = function (e) {
    //if user presses enter,    
    if(e.key === "Enter") {
      const submittedGuess = flagText.trim()
      if (!submittedGuess) {
        return
      }
      if (submitLockRef.current) {
        e.preventDefault()
        return
      }

      submitLockRef.current = true
      if (submitUnlockTimerRef.current) {
        clearTimeout(submitUnlockTimerRef.current)
      }

      checkGuess(submittedGuess)
      setFlagText('')
      e.target.value = ''

      submitUnlockTimerRef.current = setTimeout(() => {
        submitLockRef.current = false
        submitUnlockTimerRef.current = null
      }, 200)
    }
  }
  useEffect(() => {
    return () => {
      if (submitUnlockTimerRef.current) {
        clearTimeout(submitUnlockTimerRef.current)
      }
    }
  }, [])

  return (
    <QuizLayout
      showModal={quiz.showModal}
      children={
        <>
          <GuessInput
            checkForSubmit={checkForSubmit}
            showModal={quiz.showModal}
            handleInputChange={handleInputChange}
            startGame={quiz.startGame}
            activeGame={quiz.activeGame}
            value={flagText}
          />
          <FlagQuizContent
            setShowModal={quiz.setShowModal}
            country={country}
            activeGame={quiz.activeGame}
            resetScore={quiz.resetScore}
            numberCorrect={quiz.numberCorrect}
            numberGuessed={quiz.numberGuessed}
            minutesLeft={quiz.minutesLeft}
            secondsLeft={quiz.secondsLeft}
            showModal={quiz.showModal}
            missedName={missedName}
            correctName={correctName}
            guessHistory={quiz.guessHistory}
          />
        </>
      }
      modal={
        <ScoreModal
          resetScore={quiz.resetScore}
          numberCorrect={quiz.numberCorrect}
          numberGuessed={quiz.numberGuessed}
          setShowModal={quiz.setShowModal}
          guessHistory={quiz.guessHistory}
        />
      }
    />
  );
}
