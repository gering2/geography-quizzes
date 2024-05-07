import React from 'react'
import { useEffect,useState } from 'react'

export default function Flags(props) {

  return (
    !props.showModal?
    <div class="w-80 h-64 max-w-100">
    {props.country ?
    <img class = "object-contain "src={props.country.flag}></img>:<div></div> }
    </div>:null
  )
}
