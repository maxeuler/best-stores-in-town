import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  *,*:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

const Page = props => (
  <>
    <GlobalStyle></GlobalStyle>
    <Header />
    {props.children}
  </>
);

export default Page;
