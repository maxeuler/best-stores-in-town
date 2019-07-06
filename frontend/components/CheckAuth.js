import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Auth from './Auth';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      email
      name
    }
  }
`;

const CenteredTitle = styled.h3`
  text-align: center;
  font-size: 4rem;
`;

const CheckAuth = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.currentUser) {
        return (
          <>
            <CenteredTitle>Please Sign In 🥺</CenteredTitle>
            <Auth></Auth>
          </>
        );
      }
      return props.children;
    }}
  </Query>
);

export default CheckAuth;
