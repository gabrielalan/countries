import React from 'react';
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { getAllCountries } from '../../api/queries/countries';
import Navbar from '../presentational/layout/Navbar';
import TextCell from '../presentational/grid/cells/TextCell';
import Grid from '../presentational/grid/Grid';

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
    width: 100,
    label: 'Languages'
  },
};

function Home({ loggedInUser, logOut }) {
  return <>
    <Navbar>
      <button className="btn btn--default--outline btn--prefixed" onClick={logOut}>
        <img className="btn--prefixed__picture" src={`/images/${loggedInUser.avatar}`} alt={loggedInUser.username} />
        log out
      </button>
    </Navbar>
    <article className="layout-grid layout-grid--max-width layout-grid--center">
      <section className="layout-grid__item--11">
        <Query query={getAllCountries}>
          {({loading, error, data}) => {
            if (loading)
              return <p>Loading</p>;

            if (error) 
              return <p>{error.message}</p>;

            return <Grid
              indexColumn="code"
              columns={colSpecsForCountries}
              data={data.countries}
              />
          }}
        </Query>
      </section>
    </article>
  </>;
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: 'USER_LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
