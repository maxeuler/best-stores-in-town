import React from 'react';
import styled from 'styled-components';
import Nav, { NavLink } from './Nav';
import Searchbar from './Searchbar';

const SytledHeader = styled.header`
  height: 10rem;
  background: #333;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  nav {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const Logo = styled.div`
  height: 100%;
  padding: 1rem 0;
  margin: 0 2rem;
  img {
    height: 100%;
  }
`;

const Header = () => (
  <SytledHeader>
    <Logo>
      <img src="./static/logo.png" alt="Logo" />
    </Logo>
    <Nav></Nav>
    <Searchbar></Searchbar>
    <nav>
      <NavLink>Heart</NavLink>
      <NavLink>Logout</NavLink>
      <NavLink>Acc</NavLink>
    </nav>
  </SytledHeader>
);

export default Header;
