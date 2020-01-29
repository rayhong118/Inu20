import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class WIP extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <img src='https://i.imgur.com/cQ3PAbv.jpg' />
        <h1>WORK IN PROGRESS</h1>
      </Container>
    );
  }
}
