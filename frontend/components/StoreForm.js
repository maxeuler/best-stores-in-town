/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import { imageApi } from '../config';
import { ALL_STORES_QUERY } from './Stores';

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
      description
      image
      largeImage
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

  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_STORES_QUERY });
    data.stores.push(payload.data.createStore);
    cache.writeQuery({ query: ALL_STORES_QUERY, data });
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
      <Mutation
        mutation={CREATE_STORE_MUTATION}
        variables={this.state}
        update={this.updateCache}
      >
        {(createStore, { loading, error }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createStore();
              console.log(res);
              Router.push({
                pathname: '/store',
                query: { id: res.data.createStore.id },
              });
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
                maxLength="300"
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
