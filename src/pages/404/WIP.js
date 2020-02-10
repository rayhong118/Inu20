import React from 'react';
import { Container } from 'semantic-ui-react';

export default class WIP extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <img
          src='https://i.imgur.com/cQ3PAbv.jpg'
          alt='work in progress'
          style={{ maxWidth: '100%' }}
        />
        <h1>WORK IN PROGRESS</h1>
      </Container>
    );
  }
}
