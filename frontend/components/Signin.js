import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { Error } from './Signup';

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
      <Mutation mutation={SIGNIN_MUTATIOMN}>
        {(signin, { error, loading }) => (
          <Form>
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
