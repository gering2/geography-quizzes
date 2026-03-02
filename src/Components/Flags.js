import React from 'react'
import { useEffect,useState } from 'react'

export default function Flags(props) {

  return (
    !props.showModal ? (
      <div className="w-80 h-48 max-w-full bg-white border shadow-md flex-shrink-0">
        {props.country ? (
          <img
            className="w-full h-full object-fill"
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
