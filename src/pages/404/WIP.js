import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class WIP extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <Image fluid />
        <h1>Work in progress</h1>
      </Container>
    );
  }
}
