import React from 'react';

export default function Icon({ id, className }) {
  return <span className={'icon ' + (className || '')}>
    <svg viewBox="0 0 10 10" className="icon__svg" aria-hidden="true">
      <use xlinkHref={`#icon-${id}`} />
    </svg>
  </span>
}