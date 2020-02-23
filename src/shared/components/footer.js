import React from 'react';
import './footer.css';
import { Container, Icon } from 'semantic-ui-react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <Container>
          <div className='footer-content'>
            <img
              className='footer-icon'
              alt='doghead-icon'
              src='https://i.imgur.com/bK67LfF.png'
            />
            <span>
              <Icon name='mail' />
              rayhong118@gmail.com <br />
              <a href='https://github.com/dogheadslug'>
                <Icon name='github' />
                dogheadslug
              </a>
            </span>
          </div>
        </Container>
      </div>
    );
  }
}
