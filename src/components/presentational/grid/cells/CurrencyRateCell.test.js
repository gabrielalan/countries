import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyRateCell from './CurrencyRateCell';

describe('CurrencyRateCell', () => {
  it('should render the rate together with the currency', () => {
    const tree = renderer.create(<CurrencyRateCell rates={{ USD: 2 }}>USD</CurrencyRateCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render (--) when there is no rate for currency', () => {
    const tree = renderer.create(<CurrencyRateCell rates={{}}>USD</CurrencyRateCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
