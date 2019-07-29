import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './Grid';
import TextCell from './cells/TextCell';

describe('Grid', () => {
  it('should render correct number of headers, rows and columns', () => {
    const data = [{
      col1: 'Test 1',
      col2: 1234,
      col3: [1, 2, 3],
      colNotRendered: 'SHOULD NOT BE IN THE SNAPSHOT'
    }, {
      col1: 'Test 2',
      col2: 3421,
      col3: [5, 5, 5],
      colNotRendered: 'SHOULD NOT BE IN THE SNAPSHOT'
    }];

    const columns = {
      col1: {
        Type: TextCell,
        width: 100,
        label: 'Column 1'
      },
      col2: {
        Type: TextCell,
        width: 100,
        label: 'Column 2'
      },
      col3: {
        Type: TextCell,
        width: 100,
        label: 'Column 3'
      },
    };

    const tree = renderer.create(
      <Grid
        data={data}
        columns={columns}
        indexColumn="col2" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
