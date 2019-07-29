import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should render correct number of pages', () => {
    const tenPages = renderer.create(<Pagination current={0} limit={10} total={100} />).toJSON();
    expect(tenPages).toMatchSnapshot();

    const elevenPages = renderer.create(<Pagination current={0} limit={10} total={101} />).toJSON();
    expect(elevenPages).toMatchSnapshot();
  });

  it('should render correct number of pages', () => {
    const spy = jest.fn();
    const { root } = renderer.create(<Pagination current={0} limit={1} total={5} onChange={spy} />);

    const buttons = root.findAllByType('button');

    buttons[0].props.onClick();
    buttons[1].props.onClick();
    expect(spy).not.toHaveBeenCalled();
    
    buttons[2].props.onClick();
    expect(spy).toHaveBeenCalled();
  });
});