import React from 'react';
import renderer from 'react-test-renderer';
import ContainerCell from './ContainerCell';

const TypeOne = ({ children }) => `${children} One`;
const TypeTwo = ({ children }) => `${children} Two`;

describe('ContainerCell', () => {
  it('should render correct type', () => {
    const treeOne = renderer.create(
      <ContainerCell
        data="Type ==="
        columnSpec={{ Type: TypeOne }} />
    ).toJSON();

    const treeTwo = renderer.create(
      <ContainerCell
        data="Type ==="
        columnSpec={{ Type: TypeTwo }} />
    ).toJSON();

    expect(treeOne).toMatchSnapshot();
    expect(treeTwo).toMatchSnapshot();
  });

  it('should set the width', () => {
    const tree = renderer.create(
      <ContainerCell
        data="check width"
        width={100}
        columnSpec={{ Type: TypeOne }} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
