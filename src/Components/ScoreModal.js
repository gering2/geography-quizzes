import React from 'react'

export default function ScoreModal(props) {
  return (
      <div class="w-full flex justify-center items-center h-full">
        <div class =" relative rounded-md flex flex-col text-xl font-medium items-center bg-[#3333] justify-center   text-white w-[30%] h-[50%]">
               <button class="ml-auto px-2 absolute top-1 right-1" 
              onClick = {() => {props.setShowModal(false);
                if(props.setActiveGame){
                  props.setActiveGame(false)}
                  console.log('hi')
                  props.resetScore();
                  }
                 }>x</button>
              <div class="border 1px white flex flex-col h-[70%] w-[75%] justify-center items-center  ">
            <p class=" absolute top-[40%] flex flex-row">  You scored <p class=" mx-2 px-1 border solid white">{props.numberCorrect}/{props.numberGuessed}</p> </p>
            {props.numberGuessed ?
            <p class="absolute top-[55%]">{((props.numberCorrect/props.numberGuessed)*100).toFixed(2)}%</p>:null}
           </div>
        </div>
        </div>
     
  )
} 
