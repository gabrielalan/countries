import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './Loading';

describe('Loading', () => {
  it('should render the required html structure', () => {
    const tree = renderer.create(<Loading id="clear" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
