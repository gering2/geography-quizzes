import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import GuessInput from '../../components/GuessInput'
import FlagQuizContent from './FlagQuizContent'
import QuizLayout from '../../components/QuizLayout'
import ScoreModal from '../../components/ScoreModal'
import { useQuiz } from '../../hooks/useQuiz'

export default function FlagQuiz() {
  const quiz = useQuiz(60); // 60 second quiz

  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [flagGuess, setFlagGuess] = useState(null)
  const [flagText, setFlagText] = useState('')
  const [randomCountryArr, setRandomCountryArr] = useState(null)
  // name of the most recent incorrect guess (shown briefly)
  const [missedName, setMissedName] = useState('')
  const handleInputChange = function(e) {
    setFlagText(e.target.value)
  }

  const shuffle = useCallback(function (arr) {
    //shuffle array in place
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [])

  const chooseRandomCountry = useCallback(function() {
    //choose random country out of 250
    if(!countries || !randomCountryArr || randomCountryArr.length === 0) {
      return;
    }
    setCountry(countries[randomCountryArr[0]])
  }, [countries, randomCountryArr])

  const checkGuess = useCallback(function (guess) {
    //set alternate spellings of generated country to lowercase 
    if (!country) {
      return;
    }
    let lowerAltSpellings = country.altSpellings.map((country) => {
      return country.toLowerCase();
    })
    //if guess is correct
    const isCorrect =
      guess.toLowerCase() === country.name.common.toLowerCase() ||
      lowerAltSpellings.includes(guess.toLowerCase());

    if (!isCorrect) {
      setMissedName(country.name.common);
      setTimeout(() => setMissedName(''), 2000);
    }

    // add entry to history (hook handles score increment)
    quiz.addToHistory(guess, country.name.common, country.flags.png, isCorrect);
    chooseRandomCountry();
  }, [country, quiz, chooseRandomCountry])

  const checkForSubmit = function (e) {
    //if user presses enter,    
    if(e.key === "Enter") {
      setFlagGuess(flagText)
    }
  }
  const generateRandomArr = useCallback(function () {
    if (!countries) {
      return;
    }
    let randomArr = [...Array(countries.length).keys()] //generate array[0...249]
    setRandomCountryArr(shuffle(randomArr))
  }, [countries, shuffle])

  useEffect(() => {
    //if guess is made, check the guess
    if(flagGuess) {
     
      checkGuess(flagGuess)
      setFlagGuess(null)
      document.getElementById('guessInput').value = ''
    }
  },[flagGuess, checkGuess])


  useEffect(() => {
    //after setting random array for first time, choose the initial country
    if(countries && randomCountryArr && randomCountryArr.length === countries.length){
      chooseRandomCountry()
    }
  },[randomCountryArr, countries, chooseRandomCountry])

  useEffect(()=> {
    if(countries) {
      generateRandomArr()
    }
  },[countries, generateRandomArr])

  useEffect(()=> {
    if(country) {
      //reset guess and create a new random array[0] every time country is generated
      setRandomCountryArr((prev) => (prev ? prev.slice(1) : prev)) 

      //setFlagGuess('')
    }
  },[country])

  

  useEffect(()=> {
    //get list of countries on mount
    axios.get('https://restcountries.com/v3.1/all?fields=name,flags,altSpellings')
    .then(response => setCountries(response.data))
    .catch((error) => {
      console.log(error)
    })
  },[])

  return (
    <QuizLayout
      showModal={quiz.showModal}
      children={
        <>
          <GuessInput
            checkForSubmit={checkForSubmit}
            activeGame={quiz.activeGame}
            showModal={quiz.showModal}
            handleInputChange={handleInputChange}
            startGame={quiz.startGame}
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
