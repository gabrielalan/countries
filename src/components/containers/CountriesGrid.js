import React from 'react';
import { connect } from "react-redux";
import Grid from '../presentational/grid/Grid';
import Loading from '../presentational/layout/Loading';
import Pagination from '../presentational/pagination/Pagination';
import { createSetPageAction, createHideColumnAction, createSetOrderAction, createLoadDataAction } from '../../reducers/grids';

export function CountriesGrid({ gridSpecs, loadData, hideColumn, setPage, setOrder }) {
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

  return <>
    <Grid
      indexColumn="code"
      columns={gridSpecs.columns}
      data={gridSpecs.data.slice(sliceStart, sliceStart + limit)}
      onColumnHide={hideColumn}
      onColumnOrder={setOrder}
      />
    <div className="s-mt--5 s-mb--5">
      <Pagination
        current={currentPage}
        total={gridSpecs.data.length}
        limit={limit}
        onChange={setPage} />
    </div>
  </>;
}

const mapStateToProps = state => ({
  gridSpecs: state.grids.countries
});

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(createLoadDataAction('countries')),
  setPage: page => dispatch(createSetPageAction('countries', page)),
  setOrder: (id, order) => dispatch(createSetOrderAction('countries', id, order)),
  hideColumn: id => dispatch(createHideColumnAction('countries', id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesGrid);