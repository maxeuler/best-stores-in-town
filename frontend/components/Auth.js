/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import styled from 'styled-components';
import Signup from './Signup';
import Signin from './Signin';

const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  button {
    background: none;
    border: none;
    color: ${props => props.theme.primary};
    cursor: pointer;
    font-size: 1.6rem;
    outline: none;
    :hover {
      font-weight: 600;
    }
  }
`;

class Auth extends Component {
  state = {
    hasAccount: true,
  };

  toggleForm = () =>
    this.setState(prevState => ({
      hasAccount: !prevState.hasAccount,
    }));

  render() {
    return (
      <>
        {this.state.hasAccount ? <Signin></Signin> : <Signup></Signup>}
        <ToggleButton>
          <button type="button" onClick={this.toggleForm}>
            {this.state.hasAccount
              ? "Don't have an account? 👉🏼 Sign Up!"
              : 'Already have an account? 🙌🏼'}
          </button>
        </ToggleButton>
      </>
    );
  }
}

export default Auth;
