import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Auth from './Auth';
import { CenterTitle } from './TopList';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      email
      name
    }
  }
`;
const CheckAuth = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      console.log(data);
      if (loading) return <p>Loading...</p>;
      if (!data.currentUser) {
        return (
          <>
            <CenterTitle>Please Sign In 🥺</CenterTitle>
            <Auth></Auth>
          </>
        );
      }
      return props.children;
    }}
  </Query>
);

export default CheckAuth;
