import React from 'react';
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { getAllCountries } from '../../api/queries/countries';
import TextCell from '../presentational/grid/cells/TextCell';
import Grid from '../presentational/grid/Grid';
import Pagination from '../presentational/pagination/Pagination';
import { createSetColumnsAction, createSetPageAction } from '../../reducers/grids';

const colSpecsForCountries = {
  emoji: {
    Type: TextCell,
    width: 30,
    label: '#'
  },
  code: {
    Type: TextCell,
    width: 30,
    label: '#'
  },
  name: {
    Type: TextCell,
    width: 200,
    label: 'Name'
  },
  native: {
    Type: TextCell,
    width: 200,
    label: 'Native name'
  },
  phone: {
    Type: TextCell,
    width: 50,
    label: 'Phone'
  },
  currency: {
    Type: TextCell,
    width: 80,
    label: 'Currency'
  },
  continent: {
    Type: TextCell,
    width: 85,
    label: 'Continent'
  },
  languages: {
    Type: TextCell,
    width: 200,
    label: 'Languages'
  },
};

export function CountriesGrid({ gridData, setColumns, setPage }) {
  if (!gridData) {
    setColumns(colSpecsForCountries);
    return null;
  }

  const currentPage = gridData.currentPage || 0;
  const limit = 10;
  const sliceStart = currentPage * limit;

  return <Query query={getAllCountries}>
    {({loading, error, data}) => {
      if (loading)
        return <p>Loading</p>;

      if (error) 
        return <p>{error.message}</p>;

      return <>
        <Grid
          indexColumn="code"
          columns={gridData.columns}
          data={data.countries.slice(sliceStart, sliceStart + limit)}
          />
        <Pagination
          current={currentPage}
          total={data.countries.length}
          limit={limit}
          onChange={setPage} />
      </>;
    }}
  </Query>;
}

const mapStateToProps = state => ({
  gridData: state.grids.countries
});

const mapDispatchToProps = dispatch => ({
  setColumns: columns => dispatch(createSetColumnsAction('countries', columns)),
  setPage: page => dispatch(createSetPageAction('countries', page))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesGrid);