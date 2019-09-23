import React , { Component } from 'react';
import { Menu, Icon, Container } from 'semantic-ui-react';
import {  Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    
    return (
      <div>
        <Menu size='small' className='fixed ' >
          <Container>
            <Menu.Item as={Link} to='/'
              name="Navbar"
              routerid='home'
            >
              <Icon color='blue' name='react' size="huge"/>
            </Menu.Item>
          </Container>

        </Menu>
      </div>
    
    )
  }
  
}

