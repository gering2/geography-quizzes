import React from 'react'
import Flags from '../../components/Flags'
import Score from '../../components/Score'
export default function FlagQuizContent(props) {
  return (
    <div className="justify-center items-center flex flex-col">
      {!props.country && !props.showModal ? (
        <div className="mt-6 mb-4 flex items-center gap-3 text-gray-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span>Loading flags...</span>
        </div>
      ) : null}

      {!props.showModal ? (
        <div className="mb-4 mt-4 px-3 py-1 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm">
          {props.minutesLeft}:{props.secondsLeft < 10 ? '0' : ''}{props.secondsLeft}
        </div>
      ) : null}

      <Flags showModal={props.showModal} country={props.country} />

      {/* show missed country name briefly below flag */}
      {props.missedName ? (
        <div className="mt-3 text-red-600 font-semibold bg-red-50 border border-red-200 rounded-md px-3 py-1">
          Missed: {props.missedName}
        </div>
      ) : null}

      {props.activeGame ? (
        <div className="mt-4">
          <Score
            numberCorrect={props.numberCorrect}
            numberGuessed={props.numberGuessed}
          />
        </div>
      ) : null}
     
    </div>
  )
}
