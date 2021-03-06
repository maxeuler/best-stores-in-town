import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const NavLink = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 3rem;
  border-left: 0.5px solid #555;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  border-right: 0.5px solid #555;
`;

const Nav = props => (
  <StyledNav>
    {props.children}
    <Link href="/">
      <NavLink>Stores</NavLink>
    </Link>
    <Link href="/tags">
      <NavLink>Tags</NavLink>
    </Link>
    <Link href="/create">
      <NavLink>Add</NavLink>
    </Link>
  </StyledNav>
);

export default Nav;
