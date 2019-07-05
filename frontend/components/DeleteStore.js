/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_STORES_QUERY } from './Stores';

const DELETE_STORE_MUTATION = gql`
  mutation DELETE_STORE_MUTATION($id: ID!) {
    deleteStore(where: { id: $id }) {
      id
    }
  }
`;

class DeleteStore extends Component {
  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_STORES_QUERY });
    data.stores = data.stores.filter(
      store => store.id != payload.data.deleteStore.id
    );
    cache.writeQuery({ query: ALL_STORES_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_STORE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCache}
      >
        {(deleteStore, { error }) => (
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete this store?')) {
                deleteStore().catch(err => alert(err.message));
              }
            }}
          >
            Delete 👋🏼
          </button>
        )}
      </Mutation>
    );
  }
}
export default DeleteStore;
