import React from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  max-width: 900px;
  margin: 1rem auto;
  justify-content: space-between;
  border: 1px solid #ccc;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    h3 {
      font-size: 3rem;
      margin: 0;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const TopListItem = props => {
  const index = parseFloat(props.index) + 1;
  return (
    <ListItem>
      <img src={props.store.image} alt={props.store.name} height="300" />
      <div className="content">
        <h3>
          {index}. {props.store.name}
        </h3>
        <div>Stars 3 of 5</div>
        <div>32 ❤️</div>
      </div>
    </ListItem>
  );
};

export default TopListItem;
