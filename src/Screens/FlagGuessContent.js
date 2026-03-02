import React from 'react'
import Flags from '../Components/Flags'
import Score from '../Components/Score'
import ScoreModal from '../Components/ScoreModal'
export default function FlagGuessContent(props) {
  return (
    <div className="justify-center items-center flex flex-col">
      {!props.showModal ? (
        <div className="mb-3 mt-4 px-2 py-1 border-[1px]">
          {props.minutesLeft}:{props.secondsLeft < 10 ? '0' : ''}{props.secondsLeft}
        </div>
      ) : null}

      <Flags showModal={props.showModal} country={props.country} />

      {/* show missed country name briefly below flag */}
      {props.missedName ? (
        <div className="mt-2 text-red-600 font-semibold">
          Missed: {props.missedName}
        </div>
      ) : null}

      {props.activeGame ? (
        <div className="mt-4 border-[1px] px-2 py-1">
          <Score
            numberCorrect={props.numberCorrect}
            numberGuessed={props.numberGuessed}
          />
        </div>
      ) : null}
      {props.showModal ? (
        <ScoreModal
          resetScore={props.resetScore}
          numberCorrect={props.numberCorrect}
          setNumberCorrect={props.setNumberCorrect}
          numberGuessed={props.numberGuessed}
          setNumberGuessed={props.setNumberGuessed}
          setShowModal={props.setShowModal}
        />
      ) : null}
    </div>
  )
}
