import React from 'react'

export default function Flags(props) {

  return (
    !props.showModal ? (
      <div className="h-48 w-80 max-w-full flex-shrink-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.1)]">
        {props.country ? (
          <img
            className="w-full h-full object-cover"
            src={props.country.flags.png}
            alt={props.country.name?.common + ' flag'}
          />
        ) : (
          <div />
        )}
      </div>
    ) : null
  );
}
