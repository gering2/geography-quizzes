import React, { useEffect, useState } from 'react'
import QuizAnswer from './QuizAnswer'
export default function QuizAnswers(props) {
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [quizFinished,setQuizFinished] = useState(false)

  useEffect(() => {
    //set state of finished quiz when the final question is answered
    if(props.numberGuessed===props.NUM_QUESTIONS) { 
      setQuizFinished(true)
    }
  },[props.numberGuessed])
  
  return (
    <div class=" flex flex-col h-full items-center">
      {[...props.quizAnswers].map((quizCountry) => { //render 4 multiple choice questions
        return <QuizAnswer key={quizCountry.name} setNumberCorrect = {props.setNumberCorrect} setNumberGuessed={props.setNumberGuessed} numberCorrect = {props.numberCorrect} numberGuessed={props.numberGuessed} questionAnswered={questionAnswered} setQuestionAnswered={setQuestionAnswered} answer={quizCountry.capital} country={props.country}  ></QuizAnswer>
      })}
      {!quizFinished? <button disabled = {!questionAnswered} onClick = {props.chooseRandomCountry} class="rounded-sm mb-4 px-3 py-2 mt-6 bg-gray-700 hover:bg-gray-900 text-white cursor-pointer">Next&nbsp;{/*String.fromCharCode(8594)*/}</button>: <button  disabled={!questionAnswered} onClick = {props.setShowModal} class="px-3 py-2 mt-2 bg-red-700  hover:bg-red-900 text-white cursor-pointer">Next&nbsp;{/*String.fromCharCode(8594)*/}</button>}
    </div>
  )
}
