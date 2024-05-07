import React from 'react'
import {Link} from 'react-router-dom'
export default function SideNav() {
  return (
    <nav class = " text-gray-200 p-5  text-opacity-90   bg-[#201C1C]">
      <ul class= "  pr-20 w-full h-full flex flex-row justify-end gap-10">
        <Link class="   hover:text-blue-300" to = "/">Flag Quiz</Link>
        <Link class="    hover:text-blue-300 "to = "/capital-quiz">Capital Quiz</Link>
      </ul>
    </nav>
  )
}
