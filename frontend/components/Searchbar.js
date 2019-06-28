import React, { Component } from 'react';
import styled from 'styled-components';

const Search = styled.input`
  height: 100%;
  width: 100%;
  background: none;
  border: none;
  font-size: 3rem;
  padding: 1.5rem;
  caret-color: #aaa;
  outline: none;
`;

class Searchbar extends Component {
  render() {
    return <Search type="text" placeholder="Coffee, Burger, ..." />;
  }
}

export default Searchbar;
