import React, { useEffect, useState } from 'react'
import CapitalQuizOption from './CapitalQuizOption'
export default function CapitalAnswerOptions(props) {
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const quizFinished = false

  /*
  useEffect(() => {
    //set state of finished quiz when the final question is answered
    if(props.numberGuessed===props.NUM_QUESTIONS) { 
      setQuizFinished(true);
      // stop the game timer
      if(props.stopGame) {
        props.stopGame();
      }
    }
  },[props.numberGuessed, props.NUM_QUESTIONS])
  */

  useEffect(() => {
    // Reset questionAnswered when country changes (new question loaded)
    setQuestionAnswered(false);
  }, [props.country])

  useEffect(() => {
    // Auto-advance to next question after a delay when answered
    if (questionAnswered && !quizFinished) {
      const timer = setTimeout(() => {
        props.chooseRandomCountry();
      }, 850); // delay after answering question
      
      return () => clearTimeout(timer);
    }
    
    // Auto-show modal after final question
    if (questionAnswered && quizFinished) {
      const timer = setTimeout(() => {
        props.setShowModal(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [props.chooseRandomCountry, props.setShowModal, questionAnswered, quizFinished])
  
  return (
    <div className="flex flex-col gap-4 h-full items-center">
      {[...props.quizAnswers].map((quizCountry) => { //render 4 multiple choice questions
        return <CapitalQuizOption 
          key={quizCountry.name.common} 
          addToHistory={props.addToHistory}
          numberCorrect={props.numberCorrect}
          numberGuessed={props.numberGuessed}
          questionAnswered={questionAnswered} 
          setQuestionAnswered={setQuestionAnswered} 
          answer={quizCountry.capital[0]} 
          country={props.country}
          isCorrectAnswer={quizCountry.name.common === props.country?.name?.common}
          startGame={props.startGame}
          gameStarted={props.gameStarted}
          setGameStarted={props.setGameStarted}
        />
      })}
    </div>
  )
}
