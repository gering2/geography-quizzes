import React from 'react'

export default function Score(props) {
  return (
    <div class="text-gray-200">{props.numberCorrect}/{props.numberGuessed} </div>
  )
}
