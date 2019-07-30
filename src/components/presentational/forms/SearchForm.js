import React, { useState } from 'react';
import Icon from '../icon/Icon';

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');

  const onSearch = event => {
    event.preventDefault();
    onSubmit(search);
  };

  return <form action="#" onSubmit={onSearch}>
    <div className="form-group  form-group--dark-env form-group--has-suffix">
      <label htmlFor="search" className="form-group__label">Search</label>
      <input id="search" type="text" className="form-group__input" value={search} onChange={e => setSearch(e.target.value)} />

      <div className="form-group__suffix">
        <button type="submit" className="btn btn--secondary btn--iconed">
          <Icon id="search" className="btn__icon" />
        </button>
      </div>
    </div>
  </form>;
}