import React, { useEffect } from 'react'
import { useState } from 'react'

export default function QuizAnswer({setNumberCorrect,setNumberGuessed,numberCorrect,numberGuessed,answer,country,setQuestionAnswered, questionAnswered}) {

  const [correctAnswer,setCorrectAnswer] = useState(false)
  const [incorrectAnswer,setIncorrectAnswer] = useState(false)
  const handleAnswerClick = function (e) {
    //if correct answer is selected
    if(e.target.innerHTML === country.capital) {
      setCorrectAnswer(true)
      setNumberCorrect(numberCorrect+1)
      console.log('hi')
    }
    else{
      console.log('hiiii  ')
      setIncorrectAnswer(true)
    }
    
    //mark question as answered
    
  }
  useEffect(()=> {
    if(correctAnswer){
      setQuestionAnswered(true)
      setNumberGuessed(numberGuessed+1)
    }
  },[correctAnswer])

  useEffect(() => {
    if(incorrectAnswer){
      setQuestionAnswered(true)
      setNumberGuessed(numberGuessed+1)
    }
    
  },[incorrectAnswer])
  
  useEffect(() => {
    //reset values each time a new question is rendered
    setCorrectAnswer(false)
    setIncorrectAnswer(false)
    setQuestionAnswered(false)
  },[country])
  
  return (
    <button disabled={questionAnswered} onClick = {(e) => handleAnswerClick(e)} class={`rounded-sm mb-2 mt-1 flex justify-center text-white text-opacity-90  w-[40%] py-6 text-2xl cursor-pointer rounded-md  ${incorrectAnswer?"bg-[#D10203]":correctAnswer?"bg-[#00FF00]":"bg-[#333333]"}`}>{answer}</button>
  )
}
