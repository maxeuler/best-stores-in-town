import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import DeleteStore from './DeleteStore';
import { CURRENT_USER_QUERY } from './CheckAuth';

const StoreCard = styled.div`
  border: 1px solid #ddd;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }
  p {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
`;

export const Title = styled.h3`
  text-align: right;
  font-size: 3rem;
  margin: 1rem 0;
  padding: 0 2rem;
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
  }
  :hover {
    transform: skew(-10deg);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid ${props => props.theme.primary};
  button,
  a {
    background: none;
    border: none;
    text-decoration: none;
    text-align: center;
    color: ${props => props.theme.primary};
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    :hover {
      font-weight: 900;
    }
  }
`;

const Store = props => {
  const { store } = props;

  return (
    <StoreCard>
      <img src={store.image} alt={store.name} />
      <Title>
        <Link href={{ pathname: '/store', query: { id: store.id } }}>
          <a>{store.name}</a>
        </Link>
      </Title>
      <p>{store.description}</p>
      <Actions>
        <Query query={CURRENT_USER_QUERY}>
          {({ data }) => (
            <>
              <Link
                href={{ pathname: '/store', query: { id: store.id || '' } }}
              >
                <a>View 🍝</a>
              </Link>

              {data.currentUser.id == store.user.id && (
                <>
                  <Link href="/">
                    <a>Edit ✏️</a>
                  </Link>
                  <DeleteStore id={store.id}></DeleteStore>
                </>
              )}
            </>
          )}
        </Query>
      </Actions>
    </StoreCard>
  );
};

export default Store;
