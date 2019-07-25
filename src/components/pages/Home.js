import React from 'react';
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { getAllCountries } from '../../api/queries/countries';
import Navbar from '../presentational/layout/Navbar';

function Home({ loggedInUser, logOut }) {
  return <>
    <Navbar>
      <button className="btn btn--default--outline btn--prefixed" onClick={logOut}>
        <img className="btn--prefixed__picture" src={`/images/${loggedInUser.avatar}`} alt={loggedInUser.username} />
        log out
      </button>
    </Navbar>
    <div className="layout-grid layout-grid--max-width layout-grid--center s-mt--20">
      <section className="layout-grid__item--11 layout-grid__item--medium-6">
        <Query query={getAllCountries}>
          {({loading, error, data}) => {
            if (loading)
              return <p>Loading</p>;

            if (error) 
              return <p>{error.message}</p>;

            return data.countries.map(country => <p key={country.code}>{country.name}</p>);
          }}
        </Query>
      </section>
    </div>
  </>;
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: 'USER_LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
