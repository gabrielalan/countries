import React from 'react';
import { Query } from "react-apollo";
import { getAllCountries } from '../../api/queries/countries';

export default function Home() {
  return <div className="App">
    <header className="App-header">
      <Query query={getAllCountries}>
        {({loading, error, data}) => {
          if (loading)
            return <p>Loading</p>;

          if (error) 
            return <p>{error.message}</p>;

          return data.countries.map(country => <p key={country.code}>{country.name}</p>);
        }}
      </Query>
    </header>
  </div>;
}
