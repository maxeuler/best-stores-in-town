import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './CheckAuth';

const SignoutButton = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 1rem;
  border-left: 0.5px solid #555;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  background: none;
  color: white;
  border: none;
  outline: none;
`;

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

const Signout = () => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <SignoutButton type="button" onClick={signout}>
        Sign Out
      </SignoutButton>
    )}
  </Mutation>
);

export default Signout;
