import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState} from 'react'
import QuizAnswers from '../Components/QuizAnswers'
import Score from '../Components/Score'
import ScoreModal from '../Components/ScoreModal'
import { act } from 'react-dom/test-utils'
export default function CapitalGuess() {
  const [countries,setCountries] = useState(null)
  const [country,setCountry] = useState(null)
  const [activeGame,setActiveGame] = useState(false)
  const [randomCountryArr, setRandomCountryArr] = useState(null)
  const [quizAnswers,setQuizAnswers] = useState(new Set())
  const [numberGuessed, setNumberGuessed] = useState(0)
  const [numberCorrect, setNumberCorrect] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const NUM_QUESTIONS = 20;

  const resetScore = function (){
    //reset score after quiz is finished
    setNumberCorrect(0);
    setNumberGuessed(0);
  }

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
      setRandomCountryArr(randomCountryArr.splice(1)) 
    }
    var tempSet = new Set()

    if(country) {
      tempSet.add(country);
      console.log(country)
      country.correct="true";

      while(tempSet.size < 4) { 
        let randomNum = Math.floor(Math.random()*countries.length);
        tempSet.add(countries[randomNum]); //add random country to set of answers
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
    axios.get('https://restcountries.com/v2/all')
    .then(response => response.data.filter((item) => {
      return item.hasOwnProperty('capital') //remove country from country list if it does not have a capital
    }))
    .then(response => setCountries(response)) 

  },[])

  return (
    
      <div class=" overflow-y-auto  flex items-center basis-10/12 h-screen w-full flex-col bg-[#1B1717]">
        {!activeGame && !showModal?<button onClick = {() => {setActiveGame(true)}}class="absolute top-[40%] left-[50%] flex rounded-sm px-10 w-[15%] justify-center py-6  text-white text-3xl bg-red-700 hover:bg-red-900">Play</button>:null} 
        <div class="absolute right-10 top-2 text-2xl ">
          <Score numberCorrect={numberCorrect} numberGuessed={numberGuessed}></Score>
        </div>```
        
        {activeGame && !showModal?<div class="flex justify-center flex-row mt-6 mb-5 text-gray-200 bg-red-700 px-4  rounded-sm py-4 text-2xl text-opacity-90 whitespace-nowrap w-ma">What is the capital of&nbsp;<u >{country?country.name:'error'}</u>?</div>:null} 
        {activeGame && !showModal?<div class="w-full"><QuizAnswers  numberGuessed={numberGuessed} setNumberCorrect = {setNumberCorrect} setNumberGuessed={setNumberGuessed} setShowModal={setShowModal} NUM_QUESTIONS={NUM_QUESTIONS} numberCorrect = {numberCorrect}  shuffle={shuffle} chooseRandomCountry={chooseRandomCountry} country = {country} quizAnswers = {quizAnswers} ></QuizAnswers></div>:null}
        {showModal?<ScoreModal setActiveGame={setActiveGame} resetScore={resetScore}setShowModal={setShowModal} numberCorrect={numberCorrect} numberGuessed={numberGuessed} ></ScoreModal>:null}
      </div>
     
  )
  }
