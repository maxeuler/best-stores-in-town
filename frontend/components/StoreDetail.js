import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const SINGLE_STORE_QUERY = gql`
  query SINGLE_STORE_QUERY($id: ID!) {
    store(where: { id: $id }) {
      id
      name
      description
      largeImage
    }
  }
`;

const TitleImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 3rem;
  h3 {
    font-size: 5rem;
  }
  p {
    width: 50%;
    font-size: 2rem;
    align-self: flex-start;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: ${props => props.theme.primary};
    font-size: 2rem;
  }
`;

class StoreDetail extends Component {
  render() {
    return (
      <Query query={SINGLE_STORE_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;
          const { store } = data;
          return (
            <div>
              <TitleImage src={store.largeImage} alt="" />
              <Info>
                <Header>
                  <h3>{store.name}</h3>
                  <Actions>
                    <a href="">Delete</a>
                    <a href="">Edit</a>
                    <a href="">Heart</a>
                  </Actions>
                </Header>
                <p>{store.description}</p>
              </Info>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StoreDetail;
