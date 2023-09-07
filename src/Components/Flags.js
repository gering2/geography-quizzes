import React from 'react'
import { useEffect,useState } from 'react'

export default function Flags(props) {

  return (
    !props.showModal?
    <div class="bg-zinc-800 shadow-2xl rounded-sm ">
    {props.country ?
    <img class = "w-80 max-h-64 max-w-100"src={props.country.flag}></img>:<div></div> }
    </div>:null
  )
}
