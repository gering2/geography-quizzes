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
    ? "bg-red-600 scale-[1.02] shadow-red-400/60"
    : correctAnswer
      ? "bg-emerald-600 scale-[1.02] shadow-emerald-400/60"
      : shouldHighlight
        ? "bg-emerald-600 animate-pulse scale-[1.02] shadow-emerald-400/60"
        : "bg-gradient-to-r from-blue-600 to-sky-500";
  
  return (
    <button disabled={questionAnswered} onClick={handleAnswerClick} 
     className={`w-72 font-semibold px-6 flex justify-center text-white py-3.5 text-lg
       cursor-pointer rounded-xl transition-all duration-200 ease-out transform shadow-md border border-white/15
       ${!questionAnswered ? "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 active:translate-y-0" : "cursor-default"}
       ${feedbackClass} overflow-hidden`}>{answer}</button>
  )
}
