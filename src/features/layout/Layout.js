import React from 'react'
import FlagQuiz from '../flagQuiz/FlagQuiz'
import SideNav from './SideNav'
import CapitalQuiz from '../capitalQuiz/CapitalQuiz'
import { Routes,BrowserRouter,Route } from 'react-router-dom'
export default function Layout() {
   
  return (
    <div class="flex flex-col h-full">
      <BrowserRouter> 
  
          <SideNav></SideNav> 
          <Routes>  
            <Route  exact path="/" element={<FlagQuiz ></FlagQuiz>} ></Route>
            <Route  path="/capital-quiz" element={<CapitalQuiz></CapitalQuiz>} ></Route>
          </Routes>
      
      </BrowserRouter> 
    </div>  
 
  )
}
