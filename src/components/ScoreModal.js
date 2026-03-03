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
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-2xl h-[600px] shadow-2xl rounded-xl overflow-hidden border border-white/10 flex flex-col">
        <div className="relative text-white flex flex-col font-medium items-center bg-gradient-to-r from-blue-600 to-blue-500 justify-center rounded-t-xl py-4 px-6 flex-shrink-0">
                <button
                className="absolute left-4 h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 hover:scale-110 transition-all flex items-center justify-center font-bold text-lg"
                onClick = {() => {props.setShowModal(false);
                  if(props.setActiveGame){
                    props.setActiveGame(false)}
                    props.resetScore();
                    }
                  }>✕</button>
            <span className="text-base tracking-wide opacity-95 mb-1">You scored</span>
            {props.numberGuessed ?
            <span className="text-3xl font-bold tracking-tight">{((props.numberCorrect/props.numberGuessed)*100).toFixed(2)}%</span>:null}
        </div>

        {/* show guess history table if available */}
        {props.guessHistory && props.guessHistory.length > 0 ? (
          <div className="scrollbar-hide overflow-auto flex-1 rounded-b-xl bg-white">
            <table className="w-full text-left overflow-y-auto rounded-b-xl">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-b from-slate-700 to-slate-800 text-white shadow-md">
                  {columns.map((column) => (
                    column.key === 'answer' ? (
                      <th key={column.key} className="px-5 py-3 font-semibold text-sm">
                        {column.label} <span className="font-bold text-blue-200">({props.numberCorrect}/{props.numberGuessed})</span>
                      </th>
                    ) : (
                      <th key={column.key} className={`px-5 py-3 font-semibold text-sm ${column.key === 'result' ? 'text-center' : ''}`}>{column.label}</th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.guessHistory.map((item, idx) => (
                  <tr key={idx} className={`${item.correct ? 'bg-emerald-50/90' : 'bg-rose-50/90'} hover:brightness-[0.97] transition-all border-b border-gray-200/50 last:border-b-0`}>
                    {columns.map((column) => (
                      <td key={column.key} className={`px-5 py-3 text-gray-800 ${column.key === 'result' ? 'text-center text-xl' : ''}`}>
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
