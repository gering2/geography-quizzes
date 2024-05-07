import React from 'react'

export default function Score(props) {
  return (
    <div class="font-semilight ">{props.numberCorrect}/{props.numberGuessed} </div>
  )
}
