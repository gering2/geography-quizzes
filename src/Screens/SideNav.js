import React from 'react'
import {Link} from 'react-router-dom'
export default function SideNav() {
  return (
    <nav class = " flex h-screen flex-1 text-gray-200 text-opacity-90  basis-2/12 bg-[#201C1C]">
      <ul class= " divide-y divide-black divide w-full h-full flex flex-col">
        <Link class=" mt-5 mx-1 px-3 py-3 rounded bg-red-700 " to = "/">Flag Quiz</Link>
        <Link class=" mx-1 px-3 py-3 rounded bg-red-700 "to = "/capital-quiz">Capital Quiz</Link>
      </ul>
    </nav>
  )
}
