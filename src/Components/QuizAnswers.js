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
        return <QuizAnswer setNumberCorrect = {props.setNumberCorrect} setNumberGuessed={props.setNumberGuessed} numberCorrect = {props.numberCorrect} numberGuessed={props.numberGuessed} questionAnswered={questionAnswered} setQuestionAnswered={setQuestionAnswered} country={props.country}  answer={quizCountry.capital}></QuizAnswer>
      })}
      {!quizFinished? <button disabled = {!questionAnswered} onClick = {props.chooseRandomCountry} class="mb-4 px-3 py-2 mt-2 bg-red-700  hover:bg-red-900 text-white">Next&nbsp;{/*String.fromCharCode(8594)*/}</button>: <button  disabled={!questionAnswered} onClick = {props.setShowModal} class="px-3 py-2 mt-2 bg-red-700  hover:bg-red-900 text-white">Next&nbsp;{/*String.fromCharCode(8594)*/}</button>}
    </div>
  )
}
