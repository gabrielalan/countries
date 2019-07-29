import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render text normally', () => {
    const tree = renderer.create(<Navbar>inside the right section</Navbar>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
