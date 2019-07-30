import React from 'react';
import renderer from 'react-test-renderer';
import PrimitiveListCell from './PrimitiveListCell';

describe('PrimitiveListCell', () => {
  it('should render text normally', () => {
    const tree = renderer.create(<PrimitiveListCell>{['a', 'b', 'c']}</PrimitiveListCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render text normally', () => {
    const tree = renderer.create(<PrimitiveListCell>{[1, 2, 3]}</PrimitiveListCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
