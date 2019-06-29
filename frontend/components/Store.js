import React from 'react';
import styled from 'styled-components';

const StoreCard = styled.div`
  border: 1px solid #ddd;
  height: 450px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  img {
    height: 50%;
    width: 100%;
    object-fit: cover;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }
  p {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
`;

const Title = styled.h3`
  text-align: right;
  font-size: 3rem;
  margin: 1rem auto;
  max-width: 250px;
  color: ${props => props.theme.primary};
  font-weight: 600;
  /* transform: skew(-5deg); */
`;

const Store = props => {
  const { store } = props;

  return (
    <StoreCard>
      <img src={store.image} alt={store.name} />
      <Title>{store.name}</Title>
      <p>{store.description}</p>
    </StoreCard>
  );
};

export default Store;
