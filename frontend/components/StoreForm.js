/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { imageApi } from '../config';

const CREATE_STORE_MUTATION = gql`
  mutation CREATE_STORE_MUTATION(
    $name: String!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createStore(
      name: $name
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class StoreForm extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    largeImage: '',
  };

  onChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
    });

  uploadFile = async e => {
    console.log('Uploading...');
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'beststoresintown');

    const res = await fetch(imageApi, { method: 'POST', body: data });

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

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
              <input type="file" name="photo" onChange={this.uploadFile} />
              {this.state.image && (
                <img
                  src={this.state.image}
                  alt="Upload Preview 🖼️"
                  width="200"
                />
              )}
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
