import React from 'react'
import { useEffect } from 'react'
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
  const generateRandomArr = function () {
    //create array of unique numbers 1-250 (-6 for countries without capitals), choose an initial country for the quiz 
    let randomArr = [...Array(countries.length).keys()] //generate array[0...249]

    setRandomCountryArr(shuffle(randomArr)); //array of random numbers 0-249
    //choose initial country for quiz
  }

 const shuffle = function (arr) {
   //shuffle array in place
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

  const chooseRandomCountry = function () {
    //choose random country 
  //set country to first element of random array and remove the first element
      setCountry(countries[randomCountryArr[0]]);
      //countries.splice(randomCountryArr[0],1)
    } 
  useEffect(() => {
    //when the country is set, generate the other 3 multiple choice answers
    if(randomCountryArr){
      setRandomCountryArr(randomCountryArr.splice(1));
    }
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
  },[country])



  useEffect(() => {
    //when countries are set on mount, get random array for randomization of countries
    if(countries){
      generateRandomArr();
    }
  },[countries])
 

  useEffect(() => {
    //after setting random array for first time, choose the initial country
    if(randomCountryArr && randomCountryArr.length === (countries.length)) {
      chooseRandomCountry(); 
    }
  },[randomCountryArr])
  
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
            <div className="mb-4 mt-4 px-3 py-1 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm">
              {quiz.minutesLeft}:{quiz.secondsLeft < 10 ? '0' : ''}{quiz.secondsLeft}
            </div>
          ) : null}

          {country && !quiz.showModal ? (
            <div className="flex justify-center flex-row mt-2 mb-6 text-gray-200 bg-blue-700 px-5 rounded-lg py-3 text-xl text-opacity-95 whitespace-nowrap shadow-lg">
              What is the capital of&nbsp;<u className="font-bold">{country.name.common}</u>?
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

          {gameStarted ? (
            <div className="mt-4">
              <Score numberCorrect={quiz.numberCorrect} numberGuessed={quiz.numberGuessed}></Score>
            </div>
          ) : null}
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
