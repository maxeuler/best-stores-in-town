import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StoreList } from './Stores';
import Store from './Store';
import { Inner } from './Page';
import { Tags, Tag } from './StoreForm';

const TAG_STORES_QUERY = gql`
  query TAG_STORES_QUERY {
    stores(orderBy: id_DESC) {
      id
      name
      description
      image
      tags
    }
  }
`;

class TagStores extends Component {
  state = {
    tags: [],
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

  render() {
    return (
      <Inner>
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
        <Query query={TAG_STORES_QUERY}>
          {({ loading, error, data }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;
            return (
              <StoreList>
                {data.stores.map(store => {
                  if (
                    this.state.tags.some(tag => store.tags.includes(tag)) ||
                    !this.state.tags.length
                  ) {
                    return <Store store={store} key={store.id} />;
                  }
                  return null;
                })}
              </StoreList>
            );
          }}
        </Query>
      </Inner>
    );
  }
}

export default TagStores;
