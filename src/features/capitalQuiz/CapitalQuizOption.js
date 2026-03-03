import React, { useEffect } from 'react'
import { useState } from 'react'

export default function CapitalQuizOption({addToHistory, numberCorrect, numberGuessed, answer, country, setQuestionAnswered, questionAnswered, isCorrectAnswer, startGame, gameStarted, setGameStarted}) {

  const [correctAnswer,setCorrectAnswer] = useState(false)
  const [incorrectAnswer,setIncorrectAnswer] = useState(false)
  
  const handleAnswerClick = function (e) {
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
  },[correctAnswer])

  useEffect(() => {
    if(incorrectAnswer){
      setQuestionAnswered(true)
    }
    
  },[incorrectAnswer])
  
  useEffect(() => {
    //reset values each time a new question is rendered
    setCorrectAnswer(false)
    setIncorrectAnswer(false)
  },[country])
  
  const shouldHighlight = questionAnswered && !correctAnswer && isCorrectAnswer;
  const feedbackClass = incorrectAnswer
    ? "bg-[#D10203] scale-[1.02] shadow-red-400/70"
    : correctAnswer
      ? "bg-[#00FF00] scale-[1.02] shadow-green-400/70"
      : shouldHighlight
        ? "bg-[#00FF00] animate-pulse scale-[1.02] shadow-green-400/70"
        : "bg-blue-500";
  
  return (
    <button disabled={questionAnswered} onClick = {(e) => handleAnswerClick(e)} 
    className={`w-56 rounded-sm font-semibold px-4 flex justify-center text-white text-opacity-90 py-3 text-md
       cursor-pointer rounded-md transition-all duration-200 ease-out transform shadow-lg ${!questionAnswered ? "hover:bg-blue-400 hover:shadow-xl hover:scale-[1.01]" : ""} ${feedbackClass} overflow-hidden`}>{answer}</button>
  )
}
