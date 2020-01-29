import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class noMatch extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <img src='https://i.imgur.com/1gqR2Xe.jpg' />
        <h1>NOT FOUND</h1>
      </Container>
    );
  }
}
