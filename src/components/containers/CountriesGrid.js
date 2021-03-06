import difference from 'lodash/fp/difference';
import React from 'react';
import { connect } from "react-redux";
import { classNames } from '../../functions/elementHelpers';
import Grid from '../presentational/grid/Grid';
import SearchForm from '../presentational/forms/SearchForm';

import Actions from '../presentational/grid/extra/Actions';
import Loading from '../presentational/layout/Loading';
import Pagination from '../presentational/pagination/Pagination';

import {
  createSetPageAction,
  createHideColumnAction,
  createSetOrderAction,
  createLoadDataAction,
  createSetFilterAction,
  createShowColumnAction
} from '../../reducers/grids';

const searchFilter = (search, data) => data.filter(country =>
  !!~country.name.search(search) || !!~country.phone.search(search)
);

export function CountriesGrid({ gridSpecs, loadData, hideColumn, showColumn, setFilter, setPage, setOrder }) {
  if (!gridSpecs) {
    loadData();
    return <Loading />;
  }

  if (gridSpecs && gridSpecs.error) {
    return <p>{gridSpecs.error}</p>;
  }

  if (gridSpecs && gridSpecs.isLoading) {
    return <Loading />;
  }

  const limit = 10;
  const currentPage = gridSpecs.currentPage || 0;
  const sliceStart = currentPage * limit;

  const usedColumns = Object.keys(gridSpecs.columns);
  const allColumns = Object.keys(gridSpecs.originalColumns);
  const hiddenColumns = difference(allColumns, usedColumns);

  const filteredData = gridSpecs.filter && gridSpecs.filter.search
    ? searchFilter(new RegExp(gridSpecs.filter.search, 'i'), gridSpecs.data)
    : gridSpecs.data;

  const searchFormClasses = classNames({
    'layout-grid__item--animated': true,
    'layout-grid__item--12': !hiddenColumns.length,
    'layout-grid__item--8': hiddenColumns.length,
    'layout-grid__item--medium-10': hiddenColumns.length,
  });

  const showColumnsClasses = classNames({
    's-mb--2': true,
    'display--flex': true,
    'flex--justify--flex-end': true,
    'layout-grid__item--animated': true,
    'layout-grid__item--0': !hiddenColumns.length,
    'layout-grid__item--4': hiddenColumns.length,
    'layout-grid__item--medium-2': hiddenColumns.length,
  });

  return <>
    <div className="layout-grid">
      <div className={searchFormClasses}>
        <SearchForm onSubmit={search => setFilter({ search })} />
      </div>
      <div className={showColumnsClasses}>
        <Actions hiddenColumns={hiddenColumns} showColumn={showColumn} />
      </div>
    </div>

    <Grid
      indexColumn="code"
      columns={gridSpecs.columns}
      data={filteredData.slice(sliceStart, sliceStart + limit)}
      onColumnHide={hideColumn}
      onColumnOrder={setOrder}
      />

    <div className="s-mt--5 s-mb--5">
      <Pagination
        current={currentPage}
        total={filteredData.length}
        limit={limit}
        onChange={setPage} />
    </div>
  </>;
}

const mapStateToProps = state => ({
  gridSpecs: state.grids.countries,
});

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(createLoadDataAction('countries')),
  setPage: page => dispatch(createSetPageAction('countries', page)),
  setFilter: filter => dispatch(createSetFilterAction('countries', filter)),
  setOrder: (id, order) => dispatch(createSetOrderAction('countries', id, order)),
  hideColumn: id => dispatch(createHideColumnAction('countries', id)),
  showColumn: id => dispatch(createShowColumnAction('countries', id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CountriesGrid));