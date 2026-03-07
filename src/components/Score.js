import React from 'react'

export default function Score(props) {
  const accuracy = props.numberGuessed
    ? ((props.numberCorrect / props.numberGuessed) * 100).toFixed(0)
    : 0;

  return (
    <div className="flex items-center gap-3 rounded-full bg-white border border-slate-300 shadow-sm px-4 py-2 text-sm text-slate-700">
      <span className="font-semibold">Score</span>
      <span className="h-4 w-px bg-slate-300" />
      <span>{props.numberCorrect}/{props.numberGuessed}</span>
      <span className="h-4 w-px bg-slate-300" />
      <span className="font-semibold text-blue-700">{accuracy}%</span>
    </div>
  )
}
