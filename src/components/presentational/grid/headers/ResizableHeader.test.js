import React from 'react';
import renderer from 'react-test-renderer';
import ResizableHeader from './ResizableHeader';

const onResizeSpy = jest.fn();

const dataTransfer = {
  setData() {},
  setDragImage() {}
};

const getComputedStyle = () => ({
  getPropertyValue: () => '0'
});

const createNodeMocker = width => (element) => {
  if (element.type === 'div') {
    return {
      getBoundingClientRect: () => ({ width })
    };
  }

  return null;
};

describe('ResizableHeader', () => {
  beforeAll(() => (global.getComputedStyle = getComputedStyle));

  beforeEach(() => onResizeSpy.mockClear());

  it('should set new width after drag', () => {
    let tree;

    renderer.act(() => {
      tree = renderer.create(
        <ResizableHeader onResize={onResizeSpy} initialWidth={100}>text</ResizableHeader>,
        { createNodeMock: createNodeMocker(100) }
      );
    });
    
    const span = tree.root.findByType('span');

    expect(tree.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      span.props.onDragStart({
        dataTransfer,
        pageX: 50
      });
    });
      
    renderer.act(() => {
      span.props.onDrag({ pageX: 100 });
    });

    renderer.act(() => {
      span.props.onDragEnd({ pageX: 100 });
    });

    expect(onResizeSpy).toBeCalledWith(150);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
