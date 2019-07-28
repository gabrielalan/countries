import React from 'react';

import './Navbar.scss';

export default function Navbar({ children }) {
  return <header className="navbar">
    <h1 className="navbar__logo">FancyCountries</h1>
    <section className="navbar__right-section">
      {children}
    </section>
  </header>;
}