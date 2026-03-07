import React from 'react'

export default function Score(props) {
  const accuracy = props.numberGuessed
    ? ((props.numberCorrect / props.numberGuessed) * 100).toFixed(0)
    : 0;

  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-300 bg-[var(--surface-soft)] px-4 py-2 text-sm text-slate-700 shadow-[0_3px_10px_rgba(15,23,42,0.08)]">
      <span className="font-semibold uppercase tracking-[0.08em] text-slate-500">Score</span>
      <span className="h-4 w-px bg-slate-300" />
      <span>{props.numberCorrect}/{props.numberGuessed}</span>
      <span className="h-4 w-px bg-slate-300" />
      <span className="font-semibold text-blue-800">{accuracy}%</span>
    </div>
  )
}
