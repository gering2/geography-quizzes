import React from 'react'
import { NavLink } from 'react-router-dom'
export default function SideNav() {
  return (
    <nav className="text-gray-200 px-6 py-4 bg-[#201C1C]/95 border-b border-white/10 shadow-md backdrop-blur-sm">
      <div className="w-full h-full flex flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-2 ml-6">
          <span className="text-2xl">🌍</span>
          <h1 className="text-xl font-semibold tracking-wide">Geography Quizzes</h1>
        </div>
        <ul className="flex flex-row justify-end gap-4 mr-16 text-sm sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md border-b-2 transition-all duration-200 ${isActive ? 'text-white bg-white/10 border-blue-300 shadow-sm' : 'text-gray-300 border-transparent hover:text-white hover:bg-white/5 hover:-translate-y-0.5'}`
            }
          >
            🚩 Flag Quiz
          </NavLink>
          <NavLink
            to="/capital-quiz"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md border-b-2 transition-all duration-200 ${isActive ? 'text-white bg-white/10 border-blue-300 shadow-sm' : 'text-gray-300 border-transparent hover:text-white hover:bg-white/5 hover:-translate-y-0.5'}`
            }
          >
            🏛️ Capital Quiz
          </NavLink>
          <NavLink
            to="/population-quiz"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md border-b-2 transition-all duration-200 ${isActive ? 'text-white bg-white/10 border-blue-300 shadow-sm' : 'text-gray-300 border-transparent hover:text-white hover:bg-white/5 hover:-translate-y-0.5'}`
            }
          >
            📊 Population Quiz
          </NavLink>
        </ul>
      </div>
    </nav>
  )
}
