import React, { useEffect } from 'react'
import { useState } from 'react'

export default function CapitalQuizOption({ addToHistory, answer, country, setQuestionAnswered, questionAnswered, isCorrectAnswer, startGame, gameStarted, setGameStarted }) {

  const [correctAnswer,setCorrectAnswer] = useState(false)
  const [incorrectAnswer,setIncorrectAnswer] = useState(false)
  
  const handleAnswerClick = function () {
    // Start the game on first click
    if (!gameStarted) {
      startGame();
      setGameStarted(true);
    }
    
    //if correct answer is selected
    const isCorrect = answer === country.capital[0];
    
    if(isCorrect) {
      setCorrectAnswer(true)
    }
    else{
      setIncorrectAnswer(true)
    }
    
    // record guess in history
    addToHistory(answer, country.capital[0], country.name.common, isCorrect);
  }
  useEffect(()=> {
    if(correctAnswer){
      setQuestionAnswered(true)
    }
  },[correctAnswer, setQuestionAnswered])

  useEffect(() => {
    if(incorrectAnswer){
      setQuestionAnswered(true)
    }
    
  },[incorrectAnswer, setQuestionAnswered])
  
  useEffect(() => {
    //reset values each time a new question is rendered
    setCorrectAnswer(false)
    setIncorrectAnswer(false)
  },[country])
  
  const shouldHighlight = questionAnswered && !correctAnswer && isCorrectAnswer;
  const feedbackClass = incorrectAnswer
    ? "border-rose-200 bg-rose-100 text-rose-800"
    : correctAnswer
      ? "border-emerald-200 bg-emerald-100 text-emerald-800"
      : shouldHighlight
        ? "border-emerald-200 bg-emerald-100 text-emerald-800"
        : "border-slate-300 bg-white text-slate-800";
  
  return (
    <button disabled={questionAnswered} onClick={handleAnswerClick} 
     className={`w-full sm:max-w-72 overflow-hidden rounded-[14px] border px-6 py-4 text-base sm:text-lg font-semibold transition-all duration-200 ease-out
       ${!questionAnswered ? "cursor-pointer shadow-sm hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md active:translate-y-0 active:scale-[0.99]" : "cursor-default"}
       ${feedbackClass}`}>{answer}</button>
  )
}
