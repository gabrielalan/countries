import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContainerCell from './ContainerCell';
import ResizableHeader from './headers/ResizableHeader';
import Icon from '../../presentational/icon/Icon';
import { classNames } from '../../../functions/elementHelpers';

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
export default function Grid({ indexColumn, columns, data, onColumnHide, onColumnOrder }) {
  const [dimensions, setDimensions] = useState(createInitialDimensions(columns));

  const rowRenderer = createRowRenderer(columns, indexColumn, ContainerCell);

  const setColumnWidth = key => width => setDimensions({
    ...dimensions,
    [key]: width
  });

  const headers = Object.keys(columns).map(key => {
    const column = columns[key];
    const hideButton = column.isHidable ? <button type="button" className="grid__row__column__hide-button" onClick={() => onColumnHide(key)}>✖</button> : null;
    const orderIndicator = column.order ? <Icon className="grid__row__column__order" id={column.order === 'ASC' ? 'chevron-bottom' : 'chevron-top'} /> : null;

    return <ResizableHeader onResize={setColumnWidth(key)} initialWidth={column.width} key={key}>
      <button type="button"
        className={classNames({ 'grid__row__column__header-label': true, 'grid__row__column__header-label--is-orderable': column.isOrdarable })}
        onClick={() => column.isOrdarable && onColumnOrder(key, column.order === 'ASC' ? 'DESC' : 'ASC')}>
        {column.label}
        {orderIndicator}
      </button>
      {hideButton}
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
    Type: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    hide: PropTypes.bool,
  })).isRequired
};