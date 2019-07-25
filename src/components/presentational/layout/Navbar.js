import React from 'react';

import './Navbar.scss';

export default function Navbar({ children }) {
  return <div className="navbar">
    <h1 className="navbar__logo">FancyCountries</h1>
    <div className="navbar__right-side">
      {children}
    </div>
  </div>;
}