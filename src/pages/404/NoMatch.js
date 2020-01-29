import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class noMatch extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <img src='https://i.imgur.com/1gqR2Xe.jpg' style={{ maxWidth: '100%' }} />
        <h1>NOT FOUND</h1>
      </Container>
    );
  }
}
