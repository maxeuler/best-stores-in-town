import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Nav, { NavLink } from './Nav';
import Searchbar from './Searchbar';
import { CURRENT_USER_QUERY } from './CheckAuth';
import Signout from './Signout';

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
  cursor: pointer;
  img {
    height: 100%;
  }
`;

const Header = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }) => (
      <SytledHeader>
        <Link href="/">
          <Logo>
            <img src="./static/logo.png" alt="Logo" />
          </Logo>
        </Link>
        <Nav></Nav>
        <Searchbar></Searchbar>
        {data.currentUser && (
          <nav>
            <NavLink>Heart</NavLink>
            <NavLink>
              <Signout></Signout>
            </NavLink>
            <NavLink>Acc</NavLink>
          </nav>
        )}
        {!data.currentUser && (
          <nav>
            <Link href="/auth">
              <NavLink>Sign In</NavLink>
            </Link>
          </nav>
        )}
      </SytledHeader>
    )}
  </Query>
);

export default Header;
