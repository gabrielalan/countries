import React from 'react';

export default function ContainerCell({ columnSpec, width, data }) {
  return <div className="grid__row__column" style={{ width }}>
    <columnSpec.Type>{data}</columnSpec.Type>
  </div>
}
