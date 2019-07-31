import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Modal from './Modal';

jest.mock('react-dom');

describe('Modal', () => {
  beforeAll(() => {
    ReactDOM.createPortal.mockImplementation(element => element);
  });

  it('should render modal correctly', () => {
    const spy = jest.fn();
    const tree = renderer.create(<Modal title="Title" onClose={spy}>
      <p>children</p>
    </Modal>);

    renderer.act(() => {
      tree.root.findByType('button').props.onClick();
    });
    
    expect(spy).toHaveBeenCalled();
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
