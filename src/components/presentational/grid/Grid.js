import React, { useState } from 'react';
import ContainerCell from './ContainerCell';
import ResizableHeader from './headers/ResizableHeader';

const createRowRenderer = (columns, indexColumn, Cell) => {
  const columnKeys = Object.keys(columns);

  return ({ data, dimensions }) => <div className="row" key={data[indexColumn]}>
    {columnKeys.map(key => <Cell key={key} width={dimensions[key]} columnSpec={columns[key]} data={data[key]} />)}
  </div>;
};

const createInitialDimensions = columnSpecs => Object.keys(columnSpecs).reduce(
  (acc, name) => Object.assign(acc, { [name]: columnSpecs[name].width }),
  {}
);

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
    <div className="row header">{headers}</div>
    {rows}
  </section>
}