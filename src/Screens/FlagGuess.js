import React from 'react'
import { useState, useEffect} from 'react'
import Flags from '../Components/Flags'
import Score from '../Components/Score'
import axios from 'axios'
import ScoreModal from '../Components/ScoreModal'
import GuessInput from '../Components/GuessInput'
import FlagGuessContent from './FlagGuessContent'

export default function FlagGuess() {

  const [country,setCountry] = useState(null) 
  const [countries,setCountries] = useState(null)
  const [flagGuess, setFlagGuess] = useState(null)
  const [flagText,setFlagText] = useState('')
  const [numberGuessed, setNumberGuessed] = useState(0)
  const [numberCorrect, setNumberCorrect] = useState(0)
  const [timerDuration,setTimerDurtion] = useState(1)
  const [minutesLeft,setMinutesLeft] = useState(timerDuration)
  const [secondsLeft,setSecondsLeft] = useState(0)
  const [activeGame,setActiveGame] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [randomCountryArr, setRandomCountryArr] = useState(null)
  const handleInputChange = function(e) {
    //handle user input     
    setFlagText(e.target.value)
      
  }
  const resetScore = function () {
    //reset values after quiz finishes
    setNumberCorrect(0)
    setNumberGuessed(0)
  }

  const startGame = function () {
    //active game variabes and start timer
    var timeElapsed = 0;
    
    setActiveGame(true) // disable button when game starts
    
    const t = setInterval(() => {
      timeElapsed+=1
      setMinutesLeft(timerDuration-1-Math.floor(timeElapsed/60))
      setSecondsLeft(60-Math.floor((timeElapsed) % 60))

      //stop game when elapsed time reachers time limit
      if(timeElapsed === timerDuration*60) {
        stopGame(t)
      }
    },1000)
  }

  const stopGame = function (timer) {
    //reset necessary values when game is over
    clearInterval(timer)
    setMinutesLeft(0)
    setSecondsLeft(0)
    setActiveGame(false)
    setShowModal(true)
  }
  
  const checkGuess = function (guess) {
    //set alternate spellings of generated country to lowercase 
    let lowerAltSpellings = country.altSpellings.map((country) => {
      return country.toLowerCase();
    })
    //if guess is correct
    if(guess.toLowerCase() === country.name.toLowerCase()||
    lowerAltSpellings.includes(guess.toLowerCase())) {
     setNumberCorrect(numberCorrect+1)
    }
  setNumberGuessed(numberGuessed+1)
  chooseRandomCountry()
  }


  const shuffle = function (arr) {
    //shuffle array in place
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const chooseRandomCountry = function() {
    //choose random country out of 250
      setCountry(countries[randomCountryArr[0]])  
      
  }
  const checkForSubmit = function (e) {
    //if user presses enter,    
    if(e.key === "Enter") {
      console.log(country)
      setFlagGuess(flagText)
      e.target.value=''
    }
  }
  const generateRandomArr = function () {
    let randomArr = [...Array(countries.length).keys()] //generate array[0...249]
    setRandomCountryArr(shuffle(randomArr))
  }
  useEffect(() => {
    //if guess is made, check the guess
    if(flagGuess) {
      checkGuess(flagGuess)
    }
  },[flagGuess])


  useEffect(() => {
    //after setting random array for first time, choose the initial country
    if(randomCountryArr && randomCountryArr.length === countries.length){
      chooseRandomCountry()
    }
  },[randomCountryArr])

  useEffect(()=> {
    if(countries) {
      generateRandomArr()
    }
  },[countries])

  useEffect(()=> {
    if(country) {
      //reset guess and create a new random array[0] every time country is generated
      setFlagGuess('')
      setRandomCountryArr(randomCountryArr.slice(1)) 
    }
  },[country])

  useEffect(()=> {
    //get list of countries on mount
    axios.get('https://restcountries.com/v2/all')
    .then(response => setCountries(response.data))
  },[])

  return (
    <div class="flex grow shrink basis-10/12 h-full flex-col bg-[#1B1717]">
      <GuessInput checkForSubmit={checkForSubmit} activeGame = {activeGame} showModal={showModal} handleInputChange={handleInputChange} startGame={startGame}></GuessInput>
      <FlagGuessContent setShowModal = {setShowModal} country = {country} activeGame = {activeGame} resetScore = {resetScore} numberCorrect={numberCorrect} numberGuessed = {numberGuessed} minutesLeft={minutesLeft} secondsLeft={secondsLeft} showModal={showModal} ></FlagGuessContent>
    </div>
  )
}
