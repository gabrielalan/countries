import React from 'react';

import './AvatarSelector.scss';

export const availableAvatars = [
  'boy-1.svg', 'boy.svg', 'girl-1.svg',
  'girl.svg', 'man-1.svg', 'man-2.svg',
  'man-3.svg', 'man-4.svg', 'man.svg',
];

function AvatarRadio({ checked, name, onChange }) {
  return <label className="avatar-selector__radio">
    <input type="radio" name="avatar-selector" value={name} checked={checked} onChange={() => onChange(name)} />
    <img className="avatar-selector__radio__image" src={`/images/${name}`} alt={name} />
  </label>;
}

export default function AvatarSelector({ value, onChange }) {
  return <div className="avatar-selector">
    {availableAvatars.map(name => <AvatarRadio key={name} checked={value === name} name={name} onChange={onChange} />)}
  </div>;
}