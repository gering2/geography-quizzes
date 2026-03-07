import React from 'react'
import FlagQuiz from '../flagQuiz/FlagQuiz'
import SideNav from './SideNav'
import CapitalQuiz from '../capitalQuiz/CapitalQuiz'
import PopulationQuiz from '../populationQuiz/PopulationQuiz'
import { Routes,BrowserRouter,Route } from 'react-router-dom'
import { CountriesProvider } from '../../context/CountriesContext'
export default function Layout() {
  return (
    <div className="flex flex-col h-full">
      <BrowserRouter> 
          <CountriesProvider>
            <SideNav></SideNav> 
            <Routes>  
              <Route  exact path="/" element={<FlagQuiz ></FlagQuiz>} ></Route>
              <Route  path="/capital-quiz" element={<CapitalQuiz></CapitalQuiz>} ></Route>
              <Route  path="/population-quiz" element={<PopulationQuiz></PopulationQuiz>} ></Route>

            </Routes>
          </CountriesProvider>
      
      </BrowserRouter> 
    </div>  
 
  )
}
