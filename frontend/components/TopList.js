import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import TopListItem from './TopListItem';
import { ALL_STORES_QUERY } from './Stores';

export const CenterTitle = styled.h3`
  font-size: 5rem;
  text-align: center;
`;

const TopList = props => (
  <Query query={ALL_STORES_QUERY}>
    {({ data, loading, error }) => {
      if (error) return <p>Error</p>;
      return (
        <>
          <CenterTitle>Top Stores 🌯 🆙</CenterTitle>
          {data.stores.map((store, index) => (
            <TopListItem store={store} index={index} />
          ))}
        </>
      );
    }}
  </Query>
);

export default TopList;
