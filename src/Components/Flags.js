import React from 'react'
import { useEffect,useState } from 'react'

export default function Flags(props) {

  return (
    !props.showModal?
    <div class="bg-zinc-800 p-5">
    {props.country ?
    <img class = "w-80 max-h-64 max-w-100"src={props.country.flag}></img>:<div></div> }
    </div>:null
  )
}
