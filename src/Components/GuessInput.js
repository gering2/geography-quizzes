import React from 'react'

export default function GuessInput({activeGame,showModal,handleInputChange,checkForSubmit,startGame}) {
  return (
    <div class = " flex  flex-none flex-col items-center flex-none justify-center" >
      <p class="  text-opacity-80 text-2xl font-semibold py-1 p-2 underline italic">Guess the flag!</p>
      <div class = "mt-8 flex items-center justify-center flex-row">
        <input  id = 'guessInput' autocomplete="off" disabled={!activeGame} onKeyDown={(e) => {checkForSubmit(e)}} onChange ={(e) => handleInputChange(e)} class="font-semibold rounded-sm bg-slate-200 mr-1 px-1 py-1 focus:outline-none disabled:opacity-10 p-0 mdt-auto mdb-4" ></input>
        <button disabled = {activeGame || showModal}  class="w-20 rounded-sm disabled:opacity-40 disabled:hover:bg-blue-700 px-0 py-1  text-white justify-center relative bg-orange-600 font-bold hover:bg-orange-800 mdt-12" onClick={startGame}>Play</button>
      </div>
    </div>
  )
}
