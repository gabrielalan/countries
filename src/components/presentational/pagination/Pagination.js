import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../functions/elementHelpers';

function Pagination({ current, limit, total, onChange }) {
  const buttons = [];
  const numberOfPages = Math.ceil(total / limit);
  const isFirstPage = current <= 0;
  const isLastPage = (numberOfPages - 1) <= current;

  for (let i = 0; i < numberOfPages; i++) {
    buttons.push(<li key={i} className={classNames({ 'pagination__page': true, 'pagination__page--current': current === i })}>
      <button type="button" onClick={() => current !== i && onChange(i)} disabled={current === i}>{i + 1}</button>
    </li>);
  }

  return <nav className="pagination">
    <ul className="pagination__wrapper">
      <li className={classNames({ 'pagination__page': true, 'pagination__page--disabled': isFirstPage } )}>
        <button type="button" onClick={() => !isFirstPage && onChange(current - 1)} disabled={isFirstPage}>previous</button>
      </li>
      {buttons}
      <li className={classNames({ 'pagination__page': true, 'pagination__page--disabled': isLastPage } )}>
        <button type="button" onClick={() => !isLastPage && onChange(current + 1)} disabled={isLastPage}>next</button>
      </li>
    </ul>
  </nav>;
}

Pagination.defaultProps = {
  onChange: () => null
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default React.memo(Pagination);