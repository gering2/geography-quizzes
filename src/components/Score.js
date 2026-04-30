import React from 'react'

export default function Score(props) {
  const accuracy = props.numberGuessed
    ? ((props.numberCorrect / props.numberGuessed) * 100).toFixed(0)
    : 0;
  const percentColor = props.numberGuessed === 0
    ? 'text-slate-400'
    : accuracy >= 80
      ? 'text-emerald-600'
      : accuracy >= 50
        ? 'text-blue-700'
        : 'text-rose-600';

  return (
    <div className={`flex items-center gap-2  mt-2 rounded-[1.2rem] border backdrop-blur-md px-5 py-2 text-[0.89rem] 
    shadow-[0_4px_16px_rgba(15,23,42,0.10)] transition-all duration-200 ${props.animate ? 'border-green-400 border-[2.5px]' : 'border-slate-200 border-2'} bg-white/70`}>
      <span className="font-bold uppercase tracking-[0.12em] text-slate-500 text-[0.72rem] mr-1">Score</span>
      <span className="h-4 w-px bg-slate-200 mx-1" />
      <span className="font-bold text-slate-800 text-[0.98rem] tabular-nums">{props.numberCorrect}</span>
      <span className="text-slate-400 text-[0.98rem]">/</span>
      <span className="font-bold text-slate-500 text-[0.98rem] tabular-nums">{props.numberGuessed}</span>
      <span className="h-4 w-px bg-slate-200 mx-1" />
      <span className={`font-bold ml-1 tabular-nums text-[0.89rem] ${percentColor}`}>{accuracy}%</span>
    </div>
  )
}
