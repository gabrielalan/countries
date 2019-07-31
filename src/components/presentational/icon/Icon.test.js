import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './Icon';

describe('Icon', () => {
  it('should render svg normally', () => {
    const tree = renderer.create(<Icon id="clear" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow classNames', () => {
    const tree = renderer.create(<Icon id="clear" className="some-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
