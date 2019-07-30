import React from 'react';
import { connect } from 'react-redux';
import CurrencyRateCell from '../presentational/grid/cells/CurrencyRateCell';

export function CurrencyRate({ rates, ...props }) {
  return <CurrencyRateCell {...props} rates={rates} />
}

const mapStateToProps = state => ({
  rates: state.currencies && state.currencies.rates
});

export default connect(mapStateToProps)(CurrencyRate);