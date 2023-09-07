import React from 'react'
import Flags from '../Components/Flags'
import Score from '../Components/Score'
import ScoreModal from '../Components/ScoreModal'
export default function FlagGuessContent(props) {
  return (
    <div class = " h-full overflow-y-hidden justify-center items-center flex flex-col mb-10  ">
      {!props.showModal?<div class="mb-3 mt-4 px-2 py-1 border-[1px] border-white text-gray-200">{props.minutesLeft}:{props.secondsLeft<10?'0':''}{props.secondsLeft}</div>:null}
      <Flags showModal = {props.showModal} country = {props.country}></Flags>
      {props.activeGame?<div class="mt-4 border-white border-[1px] px-2 py-1" ><Score numberCorrect={props.numberCorrect} numberGuessed={props.numberGuessed}></Score></div>:null}
      {props.showModal?<ScoreModal resetScore = {props.resetScore} numberCorrect = {props.numberCorrect} setNumberCorrect = {props.setNumberCorrect} numberGuessed = {props.numberGuessed} setNumberGuessed = {props.setNumberGuessed} setShowModal={props.setShowModal} ></ScoreModal>:null}
    </div>
  )
}
