import React from 'react'

export default function GuessInput({activeGame,showModal,handleInputChange,checkForSubmit,startGame}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Guess The Flag</h2>
      </div>
      <div className="mt-8 flex items-center justify-center flex-row gap-2">
        <input
          id="guessInput"
          autoComplete="off"
          disabled={!activeGame}
          onKeyDown={(e) => {checkForSubmit(e)}}
          onChange={(e) => handleInputChange(e)}
          className="font-semibold rounded-md bg-white border border-slate-300 text-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-20"
        ></input>
        <button
          disabled={activeGame || showModal}
          className="w-20 rounded-md disabled:opacity-40 disabled:hover:bg-blue-600 py-2 text-white justify-center relative bg-gradient-to-r from-blue-600 to-sky-500 font-bold hover:from-blue-700 hover:to-sky-600 transition-colors"
          onClick={startGame}
        >
          Play
        </button>
      </div>
    </div>
  )
}
