import React from 'react'
import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { useState} from 'react'
import CapitalAnswerOptions from './CapitalAnswerOptions'
import Score from '../../components/Score'
import ScoreModal from '../../components/ScoreModal'
import QuizLayout from '../../components/QuizLayout'
import { useQuiz } from '../../hooks/useQuiz'

export default function CapitalQuiz() {
  const quiz = useQuiz(60); // x second quiz (for 20 questions)
  const [countries,setCountries] = useState(null)
  const [country,setCountry] = useState(null)
  const [randomCountryArr, setRandomCountryArr] = useState(null)
  const [quizAnswers,setQuizAnswers] = useState(new Set())
  const [gameStarted, setGameStarted] = useState(false)
  const NUM_QUESTIONS = 20;
 const shuffle = useCallback(function (arr) {
   //shuffle array in place
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}, [])

  const generateRandomArr = useCallback(function () {
    //create array of unique numbers 1-250 (-6 for countries without capitals), choose an initial country for the quiz 
    if (!countries) {
      return;
    }
    let randomArr = [...Array(countries.length).keys()] //generate array[0...249]

    setRandomCountryArr(shuffle(randomArr)); //array of random numbers 0-249
    //choose initial country for quiz
  }, [countries, shuffle])

  const chooseRandomCountry = useCallback(function () {
    //choose random country 
  //set country to first element of random array and remove the first element
      if(!countries || !randomCountryArr || randomCountryArr.length === 0) {
        return;
      }
      setCountry(countries[randomCountryArr[0]]);
      //countries.splice(randomCountryArr[0],1)
    }, [countries, randomCountryArr])
  useEffect(() => {
    //when the country is set, generate the other 3 multiple choice answers
    setRandomCountryArr((prev) => (prev ? prev.slice(1) : prev));
    var tempSet = new Set()

    if(country) {
      tempSet.add(country);

      while(tempSet.size < 4) { 
        let randomNum = Math.floor(Math.random()*countries.length);
        let randomCountry = countries[randomNum];
        // only add if it has a valid capital
        if(randomCountry.capital && randomCountry.capital.length > 0) {
          tempSet.add(randomCountry);
        }
      }
      tempSet = shuffle([...tempSet])

      setQuizAnswers(tempSet); //set state of 4 multiple choice answers
    }
  },[country, countries, shuffle])



  useEffect(() => {
    //when countries are set on mount, get random array for randomization of countries
    if(countries){
      generateRandomArr();
    }
  },[countries, generateRandomArr])
 

  useEffect(() => {
    //after setting random array for first time, choose the initial country
    if(countries && randomCountryArr && randomCountryArr.length === (countries.length)) {
      chooseRandomCountry(); 
    }
  },[randomCountryArr, countries, chooseRandomCountry])
  
  useEffect(() => {
    //on mount, get full list of countries
    axios.get('https://restcountries.com/v3.1/all?fields=name,capital')
    .then(response => response.data.filter((item) => {
      return item.capital && item.capital.length > 0 //remove country if it has no capital or empty capital
    }))
    .then(response => setCountries(response)) 

  },[])

  const handleResetScore = () => {
    quiz.resetScore();
    setGameStarted(false);
  };

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

          {/* Score in fixed position, always visible */}
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
            { key: 'result', label: 'Result' }
          ]}
        />
      }
    />
  )
}
