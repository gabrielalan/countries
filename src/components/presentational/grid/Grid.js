import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContainerCell from './ContainerCell';
import ResizableHeader from './headers/ResizableHeader';

/**
 * The Row isn't necessarily complex, so it is included
 * here together with the Grid since for now is really simple.
 * The Row is basically a "bypasser" for the column specific logic.
 */
const createRowRenderer = (columns, indexColumn, Cell) => {
  const columnKeys = Object.keys(columns);

  return ({ data, dimensions }) => <div className="grid__row" key={data[indexColumn]}>
    {columnKeys.map(key => <Cell key={key} width={dimensions[key]} columnSpec={columns[key]} data={data[key]} />)}
  </div>;
};

const createInitialDimensions = columnSpecs => Object.keys(columnSpecs).reduce(
  (acc, name) => Object.assign(acc, { [name]: columnSpecs[name].width }),
  {}
);

/**
 * This Grid is create to render the data in a way
 * that can connect different types of "visualization".
 * The type of cells for instance, can be changed quite easily.
 */
export default function Grid({ indexColumn, columns, data }) {
  const [dimensions, setDimensions] = useState(createInitialDimensions(columns));

  const rowRenderer = createRowRenderer(columns, indexColumn, ContainerCell);

  const setColumnWidth = key => width => setDimensions({
    ...dimensions,
    [key]: width
  });

  const headers = Object.keys(columns).map(key => {
    const column = columns[key];

    return <ResizableHeader onResize={setColumnWidth(key)} initialWidth={column.width} key={key}>
      <column.Type>{column.label}</column.Type>
    </ResizableHeader>;
  });

  const rows = data.map(data => rowRenderer({ data, dimensions }));

  return <section className="grid">
    <div className="grid__row grid__row--header">{headers}</div>
    {rows}
  </section>
}

Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  indexColumn: PropTypes.string.isRequired,
  columns: PropTypes.objectOf(PropTypes.shape({
    Type: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    hide: PropTypes.bool,
  })).isRequired
};