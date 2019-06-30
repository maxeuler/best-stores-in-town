import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const NavLink = styled.a`
  height: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 3rem;
  border-left: 0.5px solid #555;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  border-right: 0.5px solid #555;
`;

const Nav = () => (
  <StyledNav>
    <Link href="/">
      <NavLink>Stores</NavLink>
    </Link>
    <Link href="/tags">
      <NavLink>Tags</NavLink>
    </Link>
    <NavLink>Top</NavLink>
    <Link href="/create">
      <NavLink>Add</NavLink>
    </Link>
    <NavLink>Map</NavLink>
  </StyledNav>
);

export default Nav;
