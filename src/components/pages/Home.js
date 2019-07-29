import React from 'react';
import Header from '../containers/Header';
import CountriesGrid from '../containers/CountriesGrid';

export default function Home() {
  return <>
    <Header />
    <article className="layout-grid layout-grid--max-width layout-grid--center">
      <section className="layout-grid__item--11">
        <CountriesGrid />
      </section>
    </article>
  </>;
}
