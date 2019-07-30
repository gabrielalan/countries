import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../functions/elementHelpers';

function Pagination({ current, limit, total, onChange }) {
  const buttons = [];
  const numberOfPages = Math.ceil(total / limit);
  const lastPage = numberOfPages - 1;
  const secondLastPage = (numberOfPages - 2);
  const isFirstPage = current <= 0;
  const isLastPage = lastPage <= current;
  const rangeMax = current >= secondLastPage ? secondLastPage : current + 1;
  const rangeMin = current <= 1 ? 1 : current - 1;

  for (let i = rangeMin; i <= rangeMax; i++) {
    buttons.push(<li key={i} className={classNames({ 'pagination__page': true, 'pagination__page--current': current === i })}>
      <button className="btn btn--primary--outline" type="button" onClick={() => current !== i && onChange(i)} disabled={current === i}>{i + 1}</button>
    </li>);
  }

  return <nav className="pagination">
    <ul className="pagination__wrapper">
      <li className={classNames({ 'pagination__page': true, 'pagination__page--disabled': isFirstPage } )}>
        <button className="btn btn--primary--outline" type="button" onClick={() => !isFirstPage && onChange(current - 1)} disabled={isFirstPage}>previous</button>
      </li>
      <li className={classNames({ 'pagination__page': true, 'pagination__page--current': current === 0 } )}>
        <button className="btn btn--primary--outline" type="button" onClick={() => current !== 0 && onChange(0)} disabled={current === 0}>1</button>
      </li>
      {current > 2 ? <li className="pagination__page pagination__page--disabled"><button className="btn btn--primary--outline" disabled>...</button></li> : null}
      {buttons}
      {current < (secondLastPage - 1) ? <li className="pagination__page pagination__page--disabled"><button className="btn btn--primary--outline" disabled>...</button></li> : null}
      <li className={classNames({ 'pagination__page': true, 'pagination__page--current': isLastPage } )}>
        <button className="btn btn--primary--outline" type="button" onClick={() => !isLastPage && onChange(lastPage)} disabled={isLastPage}>{numberOfPages}</button>
      </li>
      <li className={classNames({ 'pagination__page': true, 'pagination__page--disabled': isLastPage } )}>
        <button className="btn btn--primary--outline" type="button" onClick={() => !isLastPage && onChange(current + 1)} disabled={isLastPage}>next</button>
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