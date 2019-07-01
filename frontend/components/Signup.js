/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

export const Error = styled.div`
  background: #eee;
  border-left: 5px solid ${props => props.theme.primary};
  padding: 0 1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  checkPasswords = () => {
    if (this.state.password != this.state.confirmPassword) {
      this.setState({ error: 'Passwords do not match! 🤷🏼‍' });
      return false;
    }
    if (this.state.password.length < 6) {
      this.setState({ error: 'Password has to be at least 6 chars long! 😮' });
      return false;
    }
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              if (this.checkPasswords() == false) return;
              const res = await signup();
              if (error) {
                return this.setState({ error: error.message });
              }
              console.log(res);
              this.setState({
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                error: '',
              });
              Router.push({
                pathname: '/',
              });
            }}
          >
            <h3>Sign Up! ✍️</h3>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </label>
            <label htmlFor="username">
              Name
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
            </label>
            <label htmlFor="passsword">
              Password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </label>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChange}
                required
              />
            </label>
            {this.state.error.length > 0 && (
              <Error>
                <p>{this.state.error}</p>
              </Error>
            )}
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
