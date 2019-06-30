/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import Form from './styles/Form';
import { imageApi } from '../config';
import { ALL_STORES_QUERY } from './Stores';

const AllTags = [
  'VEGETARIAN',
  'FAMILYFRIENDLY',
  'HEALTHY',
  'FASTFOOD',
  'FINEDINING',
];

const CREATE_STORE_MUTATION = gql`
  mutation CREATE_STORE_MUTATION(
    $name: String!
    $description: String!
    $image: String
    $largeImage: String
    $tags: [Tag]!
  ) {
    createStore(
      name: $name
      description: $description
      image: $image
      largeImage: $largeImage
      tags: $tags
    ) {
      id
      name
      description
      image
      largeImage
      tags
    }
  }
`;

export const Tags = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tag = styled.button`
  background: #fff;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  border-radius: 2px;
  padding: 1rem 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.9;
  outline: none;
  :hover {
    background: ${props => props.theme.primary};
    color: #fff;
    opacity: 0.8;
  }
`;

class StoreForm extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    largeImage: '',
    tags: [],
  };

  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_STORES_QUERY });
    data.stores.push(payload.data.createStore);
    cache.writeQuery({ query: ALL_STORES_QUERY, data });
  };

  toggleTag = ({ target: { value } }) => {
    const isSelected = this.state.tags.includes(value);
    let updatedTags = [];
    if (isSelected) {
      updatedTags = this.state.tags.filter(tag => tag != value);
    } else {
      updatedTags = [...this.state.tags, value];
    }
    this.setState({ tags: updatedTags });
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
                <img src={this.state.image} alt="Upload Preview" width="200" />
              )}
            </label>
            {/* TODO: Tags */}
            <h2>Tags</h2>
            <Tags>
              <Tag
                type="button"
                onClick={this.toggleTag}
                name="Vegetarian"
                value="VEGETARIAN"
                style={
                  this.state.tags.includes('VEGETARIAN')
                    ? { background: '#5c0931', color: '#fff' }
                    : null
                }
              >
                Vegetarian
              </Tag>
              <Tag
                type="button"
                onClick={this.toggleTag}
                name="Family Friendly"
                value="FAMILYFRIENDLY"
                style={
                  this.state.tags.includes('FAMILYFRIENDLY')
                    ? { background: '#5c0931', color: '#fff' }
                    : null
                }
              >
                Family Friendly
              </Tag>
              <Tag
                type="button"
                onClick={this.toggleTag}
                name="Healthy"
                value="HEALTHY"
                style={
                  this.state.tags.includes('HEALTHY')
                    ? { background: '#5c0931', color: '#fff' }
                    : null
                }
              >
                Healthy
              </Tag>
              <Tag
                type="button"
                onClick={this.toggleTag}
                name="Fast Food"
                value="FASTFOOD"
                style={
                  this.state.tags.includes('FASTFOOD')
                    ? { background: '#5c0931', color: '#fff' }
                    : null
                }
              >
                Fast Food
              </Tag>
              <Tag
                type="button"
                onClick={this.toggleTag}
                name="Fine Dining"
                value="FINEDINING"
                style={
                  this.state.tags.includes('FINEDINING')
                    ? { background: '#5c0931', color: '#fff' }
                    : null
                }
              >
                Fine Dining
              </Tag>
            </Tags>
            <button type="submit">Save</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default StoreForm;
