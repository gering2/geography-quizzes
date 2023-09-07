import React from 'react'
import {Link} from 'react-router-dom'
export default function SideNav() {
  return (
    <nav class = " flex h-screen text-gray-200 text-opacity-90  basis-2/12 bg-[#201C1C]">
      <ul class= " divide-y divide-black divide w-full h-full flex flex-col">
        <Link class=" mt-5  px-3 py-3 w-f[] bg-zinc-700 hover:bg-zinc-900 " to = "/">Flag Quiz</Link>
        <Link class="  px-3 py-3 w-full  bg-zinc-700 hover:bg-zinc-900 "to = "/capital-quiz">Capital Quiz</Link>
      </ul>
    </nav>
  )
}
