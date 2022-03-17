import React from 'react'
import FlagGuess from './FlagGuess'
import SideNav from './SideNav'
import CapitalGuess from './CapitalGuess'
import { Routes,BrowserRouter,Route } from 'react-router-dom'
export default function Layout() {
   
  return (
    <div class="flex flex-row h-full">
      <BrowserRouter> 
  
          <SideNav></SideNav> 
          <Routes>  
            <Route  exact path="/" element={<FlagGuess ></FlagGuess>} ></Route>
            <Route  path="/capital-quiz" element={<CapitalGuess></CapitalGuess>} ></Route>
          </Routes>
      
      </BrowserRouter> 
    </div>  
 
  )
}
