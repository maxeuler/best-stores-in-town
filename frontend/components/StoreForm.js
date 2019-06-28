import React, { Component } from 'react';
import Form from './styles/Form';

class StoreForm extends Component {
  render() {
    return (
      <Form method="POST">
        <h3>add store</h3>
        <label htmlFor="name">
          Name
          <input type="text" name="name" required />
        </label>
        <label htmlFor="description">
          Description
          <textarea name="description" rows="5" required></textarea>
        </label>
        <label htmlFor="photo">
          Photo
          <input type="file" name="photo" />
          {/* TODO: if editing mode 👉🏼 show photo */}
        </label>
        {/* TODO: Tags */}
        <button type="submit">Save</button>
      </Form>
    );
  }
}

export default StoreForm;
