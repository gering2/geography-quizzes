import React from 'react'

export default function GuessInput({activeGame,showModal,handleInputChange,checkForSubmit,startGame,value}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Challenge Mode</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">Guess The Flag</h2>
      </div>
      <div className="mt-6 flex w-full flex-row items-center justify-center gap-2.5">
        <input
          id="guessInput"
          type="text"
          autoComplete="off"
          placeholder="Type a country..."
          disabled={!activeGame}
          value={value}
          onKeyDown={checkForSubmit}
          onChange={handleInputChange}
          className={`w-full min-h-[46px] rounded-[var(--radius-control)] border border-slate-300 px-[1.05rem] py-2.5 text-[1.02rem] font-semibold leading-normal tracking-normal text-slate-900 caret-blue-600 shadow-[var(--shadow-control)] outline-none transition-colors duration-300 placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:shadow-[0_6px_14px_rgba(37,99,235,0.15)] focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-45 bg-white`}
        />
        <button
          disabled={showModal || activeGame}
          className="relative w-24 rounded-[var(--radius-control)] border border-blue-600 bg-blue-600 py-2.5 font-bold text-white shadow-[0_4px_10px_rgba(37,99,235,0.28)] transition-all hover:border-blue-700 hover:bg-blue-700 hover:shadow-[0_6px_14px_rgba(37,99,235,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none"
          onClick={startGame}
        >
          {activeGame ? 'Playing' : 'Play'}
        </button>
      </div>
    </div>
  )
}
