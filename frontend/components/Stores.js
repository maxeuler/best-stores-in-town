import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_STORES_QUERY = gql`
  query ALL_STORES_QUERY {
    stores(orderBy: id_DESC) {
      id
      name
      description
    }
  }
`;

const Stores = () => (
  <Query query={ALL_STORES_QUERY}>
    {({ loading, error, data }) => {
      if (error) return <p>Error</p>;
      if (loading) return <p>Loading</p>;
      return (
        <ul>
          {data.stores.map(store => (
            <li>
              {store.name}: {store.description}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Stores;
