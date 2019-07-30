import React from 'react';
import { connect } from "react-redux";
import Grid from '../presentational/grid/Grid';
import SearchForm from '../presentational/forms/SearchForm';

import Loading from '../presentational/layout/Loading';
import Pagination from '../presentational/pagination/Pagination';

import {
  createSetPageAction,
  createHideColumnAction,
  createSetOrderAction,
  createLoadDataAction,
  createSetFilterAction
} from '../../reducers/grids';

const searchFilter = (search, data) => data.filter(country =>
  !!~country.name.search(search) || !!~country.phone.search(search)
);

export function CountriesGrid({ gridSpecs, loadData, hideColumn, setFilter, setPage, setOrder }) {
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
  const filteredData = gridSpecs.filter && gridSpecs.filter.search
    ? searchFilter(new RegExp(gridSpecs.filter.search, 'i'), gridSpecs.data)
    : gridSpecs.data;

  return <>
    <SearchForm onSubmit={search => setFilter({ search })} />
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
  hideColumn: id => dispatch(createHideColumnAction('countries', id))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CountriesGrid));