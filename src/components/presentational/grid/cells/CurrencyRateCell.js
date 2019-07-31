import React from 'react';
import PropTypes from 'prop-types';

const locale = navigator.language || navigator.userLanguage

export default function CurrencyRateCell({ rates, children }) {
  const link = !rates[children]
    ? "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
    : `https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-${children.toLowerCase()}.en.html`;

  const rate = rates[children] ? `${rates[children].toLocaleString(locale)}` : '--';

  return <div className="currency-rate">
    {children} 
    <a href={link}
      target="blank">
      ({rate})
    </a>
  </div>;
}

CurrencyRateCell.propTypes = {
  children: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired
};