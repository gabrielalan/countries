import React from 'react';
import TextCell from './TextCell';

/**
 * A Cell type that can iterate over a list of primitive values (string, numbers, etc)
 * And render a certain type with it.
 */
export default function PrimitiveListCell({ CellType, children }) {
  return children.map(data => <CellType key={data}>{data}</CellType>);
}

PrimitiveListCell.defaultProps = {
  CellType: TextCell
};

/**
 * HighOrder function that returns a component
 * Patching the PrimitiveListCell to contain a CellType
 */
export const withCellType = type => props => <PrimitiveListCell CellType={type} {...props} />;