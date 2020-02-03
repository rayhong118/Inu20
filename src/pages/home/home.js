import React, { Component } from 'react';
import './home.css';

import { Container } from 'semantic-ui-react';

export default class HomePage extends Component {
  // on transition end,
  // on mouse out, add hidde class to content

  render() {
    return (
      <div>
        <div>
          <div id='title-banner'>
            <Container>
              <h1>Inu20</h1>
              <h2>Doghead and doghead's personal website</h2>
            </Container>
          </div>
        </div>
        <Container textAlign='center'>
          <h2>Word</h2>
          <h4>
            <i>-A word from doghead.</i>
          </h4>
        </Container>
      </div>
    );
  }
}
