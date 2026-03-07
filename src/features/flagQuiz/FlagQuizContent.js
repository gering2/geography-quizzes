import React from 'react'
import Flags from '../../components/Flags'
import Score from '../../components/Score'
export default function FlagQuizContent(props) {
  return (
    <div className="justify-center items-center flex flex-col">
      {!props.country && !props.showModal ? (
        <div className="mt-6 mb-4 flex items-center gap-3 text-slate-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span>Loading flags...</span>
        </div>
      ) : null}

      {!props.showModal ? (
        <div className="mb-4 mt-4 px-3 py-1 border border-slate-300 rounded-full bg-slate-100 text-slate-700 shadow-sm">
          {props.minutesLeft}:{props.secondsLeft < 10 ? '0' : ''}{props.secondsLeft}
        </div>
      ) : null}

      <Flags showModal={props.showModal} country={props.country} />

      {/* Score in fixed position, always visible */}
      <div className="mt-8">
        <Score
          numberCorrect={props.numberCorrect}
          numberGuessed={props.numberGuessed}
        />
      </div>

      {/* reserve space so modal size stays stable */}
      <div className="mt-3 h-9 flex items-center justify-center">
        {props.missedName ? (
          <div className="text-[#b0433f] font-semibold bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-1">
            Missed: {props.missedName}
          </div>
        ) : null}
      </div>
     
    </div>
  )
}
