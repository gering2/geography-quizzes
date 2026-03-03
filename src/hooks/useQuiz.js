import { useState } from 'react';

export const useQuiz = (timerDurationSeconds = null) => {
  const [minutesLeft, setMinutesLeft] = useState(timerDurationSeconds ? Math.floor(timerDurationSeconds / 60) : 0);
  const [secondsLeft, setSecondsLeft] = useState(timerDurationSeconds ? timerDurationSeconds % 60 : 0);
  const [activeGame, setActiveGame] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [numberGuessed, setNumberGuessed] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);

  const startGame = () => {
    let timeElapsed = 0;
    setGuessHistory([]);
    setNumberCorrect(0);
    setNumberGuessed(0);
    setActiveGame(true);

    // only set up timer if duration was provided
    if (timerDurationSeconds === null) {
      return;
    }

    const t = setInterval(() => {
      timeElapsed += 1;
      setMinutesLeft(Math.floor((timerDurationSeconds - timeElapsed) / 60));
      setSecondsLeft((timerDurationSeconds - timeElapsed) % 60);

      if (timeElapsed === timerDurationSeconds) {
        stopGame(t);
      }
    }, 1000);

    return () => clearInterval(t);
  };

  const stopGame = (timer) => {
    if (timer) clearInterval(timer);
    setMinutesLeft(0);
    setSecondsLeft(0);
    setActiveGame(false);
    setShowModal(true);
  };

  const resetScore = () => {
    setNumberCorrect(0);
    setNumberGuessed(0);
    setGuessHistory([]);
    setShowModal(false);
  };

  const addToHistory = (guess, answer, flag, correct) => {
    setGuessHistory((h) => [
      ...h,
      {
        guess,
        answer,
        flag,
        correct,
      },
    ]);

    if (correct) {
      setNumberCorrect((n) => n + 1);
    }
    setNumberGuessed((n) => n + 1);
  };

  return {
    // state
    activeGame,
    showModal,
    numberCorrect,
    numberGuessed,
    minutesLeft,
    secondsLeft,
    guessHistory,
    hasTimer: timerDurationSeconds !== null,
    // actions
    startGame,
    stopGame,
    resetScore,
    addToHistory,
    setShowModal,
  };
};
