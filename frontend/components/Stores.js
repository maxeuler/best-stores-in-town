import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Store from './Store';
import { Inner } from './Page';

const StoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 350px));
  justify-content: space-around;
  row-gap: 20px;
  margin: 5rem auto;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(250px, 350px));
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, minmax(250px, 350px));
  }
`;

const ALL_STORES_QUERY = gql`
  query ALL_STORES_QUERY {
    stores(orderBy: id_DESC) {
      id
      name
      description
      image
    }
  }
`;

const Stores = () => (
  <Query query={ALL_STORES_QUERY}>
    {({ loading, error, data }) => {
      if (error) return <p>Error</p>;
      if (loading) return <p>Loading</p>;
      return (
        <Inner>
          <StoreList>
            {data.stores.map(store => (
              <Store store={store} key={store.id} />
            ))}
          </StoreList>
        </Inner>
      );
    }}
  </Query>
);

export default Stores;
