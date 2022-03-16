import React from 'react'

export default function GuessInput({activeGame,showModal,handleInputChange,checkForSubmit,startGame}) {
  return (
    <div class = "solid border-b border-zinc-700 flex flex-none justify-center h-36" >
      <div class = "flex items-center flex-row">
        <input id = 'guessInput' disabled={!activeGame} onKeyDown={(e) => {checkForSubmit(e)}} onChange ={(e) => handleInputChange(e)} class="mr-1 px-1 py-1 focus:outline-none disabled:opacity-10 p-0 mdt-auto mdb-4" ></input>
        <button disabled = {activeGame || showModal}class="w-20 rounded-sm disabled:opacity-40 disabled:hover:bg-red-700 px-0 py-1 text-gray-200 justify-center relative bg-red-700 hover:bg-red-900 mdt-12" onClick={startGame}>play</button>
      </div>
    </div>
  )
}
