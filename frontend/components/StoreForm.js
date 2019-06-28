import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';

const CREATE_STORE_MUTATION = gql`
  mutation CREATE_STORE_MUTATION($name: String!, $description: String!) {
    createStore(name: $name, description: $description)
  }
`;

class StoreForm extends Component {
  state = {
    name: '',
    description: '',
  };

  onChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
    });

  render() {
    return (
      <Mutation mutation={CREATE_STORE_MUTATION} variables={this.state}>
        {(createStore, { loading, error }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createStore();
              console.log(res);
            }}
          >
            <h3>add store</h3>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                name="description"
                rows="5"
                value={this.state.description}
                onChange={this.onChange}
                required
              ></textarea>
            </label>
            <label htmlFor="photo">
              Photo
              <input type="file" name="photo" />
              {/* TODO: if editing mode 👉🏼 show photo */}
            </label>
            {/* TODO: Tags */}
            <button type="submit">Save</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default StoreForm;
