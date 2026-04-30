import React from 'react'
import { NavLink } from 'react-router-dom'
export default function SideNav() {
  const baseLinkClass =
    'px-4 py-2 rounded-full border text-sm sm:text-[0.95rem] font-semibold tracking-tight transition-all duration-200 inline-flex items-center gap-2';

  return (
    <nav className="border-b border-[var(--border)] bg-white/88 px-4 py-4 shadow-[0_6px_16px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100/80 text-slate-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl">Geography Quizzes</h1>
        </div>
        <ul className="scrollbar-hide flex w-full flex-nowrap justify-start gap-2 overflow-x-auto sm:w-auto sm:justify-end sm:gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-[0_2px_8px_rgba(37,99,235,0.14)]' : 'border-slate-200 bg-white text-[var(--text-muted)] hover:border-slate-300 hover:text-[var(--text)] hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]'}`
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 21V4m0 0h10l-1.6 3L15 10H5" />
            </svg>
            Flag
          </NavLink>
          <NavLink
            to="/capital-quiz"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-[0_2px_8px_rgba(37,99,235,0.14)]' : 'border-slate-200 bg-white text-[var(--text-muted)] hover:border-slate-300 hover:text-[var(--text)] hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]'}`
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 9h18M4.5 9V7l7.5-3 7.5 3v2M6 9v7m4-7v7m4-7v7m4-7v7M3 20h18" />
            </svg>
            Capital
          </NavLink>
          <NavLink
            to="/population-quiz"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-[0_2px_8px_rgba(37,99,235,0.14)]' : 'border-slate-200 bg-white text-[var(--text-muted)] hover:border-slate-300 hover:text-[var(--text)] hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]'}`
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 18V9m7 9V6m7 12v-4" />
              <path d="M3 20h18" />
            </svg>
            Population
          </NavLink>
        </ul>
      </div>
    </nav>
  )
}
