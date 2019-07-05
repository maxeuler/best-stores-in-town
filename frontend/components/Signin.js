import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import { Error } from './Signup';
import { CURRENT_USER_QUERY } from './CheckAuth';

const SIGNIN_MUTATIOMN = gql`
  mutation SIGNIN_MUTATIOMN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATIOMN}
        variables={{ email: this.state.email, password: this.state.password }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({
                email: '',
                password: '',
                error: '',
              });
              Router.push('/');
            }}
          >
            <h3>Sign In 🔓</h3>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                required
                value={this.state.email}
                onChange={this.onChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
            </label>
            {this.state.error.length > 0 && (
              <Error>
                <p>{this.state.error}</p>
              </Error>
            )}
            <Error>{error}</Error>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
