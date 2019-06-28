import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
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

const theme = {
  primary: '#5c0931',
};

const Page = props => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle></GlobalStyle>
      <Header />
      {props.children}
    </>
  </ThemeProvider>
);

export default Page;
