import React from 'react'

export default function ScoreModal(props) {
  return (
      <div class="absolute t-[40%] h-[50%] w-[45%] ">
        <div class =" relative text-white rounded-md flex font-medium items-center bg-orange-500 justify-center ">
               <button class="right-5 first-letter relative flex justify-self-start font-extrabold rounded-lg px-1" 
              onClick = {() => {props.setShowModal(false);
                if(props.setActiveGame){
                  props.setActiveGame(false)}
                  console.log('hi')
                  props.resetScore();
                  }
                 }>x</button>
              <div class="  ">
            <p class="flex flex-row">  You scored <span class= "font-bold px-2 text-grey-100 ">{props.numberCorrect}/{props.numberGuessed}</span> </p>
            {props.numberGuessed ?
            <p class="">{((props.numberCorrect/props.numberGuessed)*100).toFixed(2)}%</p>:null}
           </div>
        </div>
        </div>
     
  )
} 
