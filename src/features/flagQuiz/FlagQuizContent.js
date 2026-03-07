import React from 'react'
import Flags from '../../components/Flags'
import Score from '../../components/Score'
export default function FlagQuizContent(props) {
  const totalSecondsLeft = props.minutesLeft * 60 + props.secondsLeft
  const isUrgent = props.activeGame && totalSecondsLeft <= 10
  const timerToneClass = isUrgent
    ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-[0_3px_10px_rgba(245,158,11,0.18)]'
    : props.activeGame
      ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-[0_3px_10px_rgba(37,99,235,0.16)]'
      : 'border-slate-300 bg-white text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.06)]'

  return (
    <div className="flex flex-col items-center justify-center">
      {!props.country && !props.showModal ? (
        <div className="mb-4 mt-6 flex items-center gap-3 text-slate-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span>Loading flags...</span>
        </div>
      ) : null}

      {!props.showModal ? (
        <div className={`mb-4 mt-4 inline-flex min-w-[4.5rem] justify-center rounded-full border px-4 py-1.5 font-mono text-sm font-semibold tracking-[0.06em] transition-colors ${timerToneClass}`}>
          {props.minutesLeft}:{props.secondsLeft < 10 ? '0' : ''}{props.secondsLeft}
        </div>
      ) : null}

      <Flags showModal={props.showModal} country={props.country} />

      {/* Score in fixed position, always visible */}
      <div className="mt-7">
        <Score
          numberCorrect={props.numberCorrect}
          numberGuessed={props.numberGuessed}
        />
      </div>

      {/* reserve space so modal size stays stable */}
      <div className="mt-4 flex h-9 items-center justify-center">
        {props.missedName ? (
          <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1 font-semibold text-rose-700">
            Missed: {props.missedName}
          </div>
        ) : null}
      </div>
     
    </div>
  )
}
