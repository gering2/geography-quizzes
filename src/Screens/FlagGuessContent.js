import React from 'react'
import Flags from '../Components/Flags'
import Score from '../Components/Score'
import ScoreModal from '../Components/ScoreModal'
export default function FlagGuessContent(props) {
  return (
    <div class = "h-full justify-center items-center flex flex-col bg-inherit ">
      {!props.showModal?<div class="mb-3 mt-4 text-gray-200">{props.minutesLeft}:{props.secondsLeft<10?'0':''}{props.secondsLeft}</div>:null}
      <Flags showModal = {props.showModal} country = {props.country}></Flags>
      {props.activeGame?<div class="mt-4" ><Score numberCorrect={props.numberCorrect} numberGuessed={props.numberGuessed}></Score></div>:null}
      {props.showModal?<ScoreModal resetScore = {props.resetScore} numberCorrect = {props.numberCorrect} setNumberCorrect = {props.setNumberCorrect} numberGuessed = {props.numberGuessed} setNumberGuessed = {props.setNumberGuessed} setShowModal={props.setShowModal} ></ScoreModal>:null}
    </div>
  )
}
