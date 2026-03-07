import React from 'react'

export default function ScoreModal(props) {
  // Default columns if not provided (for backward compatibility)
  const columns = props.columns || [
    { key: 'guess', label: 'Guess' },
    { key: 'flag', label: 'Flag' },
    { key: 'answer', label: 'Correct' },
    { key: 'result', label: 'Result' }
  ];

  const renderCell = (item, column) => {
    if (column.key === 'flag') {
      // If flag is a URL, render as image; otherwise render as text (country name)
      if (item.flag && item.flag.startsWith('http')) {
        return (
          <img
            src={item.flag}
            alt={item.answer + ' flag'}
            className="w-10 h-6 object-contain"
          />
        );
      } else if (item.flag) {
        // Display country name as text
        return <span>{item.flag}</span>;
      }
      return null;
    } else if (column.key === 'result') {
      return item.correct ? '✅' : '❌';
    } else if (column.key === 'answer') {
      return item.answer;
    } else if (column.key === 'correct') {
      return item.correct ? '✅' : '❌';
    } else if (column.key === 'guess') {
      return item.guess;
    }
    return null;
  };

  return (
      <div className="mx-auto flex h-[600px] w-[92vw] max-w-2xl flex-col overflow-hidden rounded-[var(--radius-card)] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
    <div className="relative flex flex-shrink-0 flex-col items-center justify-center border-b border-slate-200 bg-slate-50 px-6 py-5 font-medium text-slate-900">
                <button
                className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100"
                onClick = {() => {props.setShowModal(false);
                  if(props.setActiveGame){
                    props.setActiveGame(false)}
                    props.resetScore();
                    }
                  }>✕</button>
            <span className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Final Score</span>
            {props.numberGuessed ?
            <span className="text-3xl font-bold tracking-tight text-[var(--text)]">{((props.numberCorrect/props.numberGuessed)*100).toFixed(2)}%</span>:null}
        </div>

        {/* show guess history table if available */}
        {props.guessHistory && props.guessHistory.length > 0 ? (
          <div className="scrollbar-hide flex-1 overflow-auto bg-white">
            <table className="w-full overflow-y-auto text-left">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-b from-slate-700 to-slate-800 text-white shadow-md">
                  {columns.map((column) => (
                    column.key === 'answer' ? (
                      <th key={column.key} className="px-5 py-3 text-sm font-semibold">
                        {column.label} <span className="font-bold text-blue-200">({props.numberCorrect}/{props.numberGuessed})</span>
                      </th>
                    ) : (
                      <th key={column.key} className={`px-5 py-3 text-sm font-semibold ${column.key === 'result' ? 'text-center' : ''}`}>{column.label}</th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.guessHistory.map((item, idx) => (
                  <tr key={idx} className={`${item.correct ? 'bg-emerald-50/80' : 'bg-rose-50/80'} border-b border-slate-200/70 transition-all hover:brightness-[0.98] last:border-b-0`}>
                    {columns.map((column) => (
                      <td key={column.key} className={`px-5 py-3 text-slate-800 ${column.key === 'result' ? 'text-center text-xl' : ''}`}>
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        </div>
       
     
  )
} 
