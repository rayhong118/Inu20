import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import { Container, Card } from 'semantic-ui-react';

export default class HomePage extends Component {
  // on transition end,
  // on mouse out, add hidde class to content

  render() {
    return (
      <>
        <div id='title-banner'>
          <Container>
            <h1>Inu20</h1>
            <h2>Doghead and doghead's personal website</h2>
          </Container>
        </div>

        <Container textAlign='center' id='aWord'>
          <h2>Word.</h2>
          <h4>
            <i>-A word from doghead.</i>
          </h4>
        </Container>

        <Card.Group as={Container} centered itemsPerRow='2' stackable>
          <Card
            as={Link}
            to='./restaurants'
            image='https://i.imgur.com/5xZDb8Q.jpg'
            header='Restaurant List'
            meta='For Authenticated Users Only'
            description='Use this App in case of having difficulty deciding a destination for lunch and dinner.'
          ></Card>

          <Card
            as={Link}
            to='./doghead-zh'
            image='https://i.imgur.com/IR42UdO.jpg'
            header='Doghead Comics'
            meta='Public'
            description='Boring Comics'
          ></Card>
        </Card.Group>
      </>
    );
  }
}
