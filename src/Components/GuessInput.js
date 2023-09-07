import React from 'react'

export default function GuessInput({activeGame,showModal,handleInputChange,checkForSubmit,startGame}) {
  return (
    <div class = "solid border-b border-zinc-700 flex  flex-none flex-col items-center flex-none justify-center h-44" >
      <p class="text-white bg-[#201C1C] border-opacity-80 text-opacity-80 text-2xl border border-white py-1 p-2">Guess the flag</p>
      <div class = "mt-8 flex items-center justify-center flex-row">
        <input  id = 'guessInput' autocomplete="off" disabled={!activeGame} onKeyDown={(e) => {checkForSubmit(e)}} onChange ={(e) => handleInputChange(e)} class="rounded-sm mr-1 px-1 py-1 focus:outline-none disabled:opacity-10 p-0 mdt-auto mdb-4" ></input>
        <button disabled = {activeGame || showModal}  class=" w-20 rounded-sm disabled:opacity-40 disabled:hover:bg-red-700 px-0 py-1  text-gray-200 justify-center relative bg-red-700 hover:bg-red-900 mdt-12" onClick={startGame}>Play</button>
      </div>
    </div>
  )
}
