import { BrowserRouter, Route, NavLink} from 'react-router-dom';
import { Container, Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import AboutPage from './about/about';
import Restaurant from './restaurants/restaurant-page';
import HomePage from './home/home';
import JsonPlaceholder from './1909-json-placeholder/json-placeholder';

import React from 'react';

export default class Root extends React.Component {
  state = {
    sideBarVisible: false
  }

  toggleSideBar(){
    let newState = this.state.sideBarVisible;
    this.setState({sideBarVisible: !!newState ? false : true});
  }

  handleOutSideClick(e) {
    if(!e) return;
    console.log(e);
    e.stopPropagation();
    if(e.target.name !== "SideBarToggle") {
      this.setState({sideBarVisible: false });
    }
  }
  
	render() {
    const { sideBarVisible } = this.state;
		return(
			<div style={{height: '100vh', display: 'flex', flexFlow: 'column nowrap', position: 'sticky'}}> 
        <Menu secondary className='top-bar'>
          <Menu.Item onClick={()=> this.toggleSideBar()}>
            <Icon id="SideBarToggle" name='bars'/>
          </Menu.Item>
          <Menu.Item header fitted='horizontally'>
            Doghead Protal
          </Menu.Item>
        </Menu>

        <BrowserRouter><Sidebar.Pushable className='main-panel'>
          <Sidebar 
            as={Menu}
            animation='overlay'
            direction='left'
            onHide={(e) => this.handleOutSideClick(e)}
            vertical
            visible={sideBarVisible}>

            <Menu.Item
              as={NavLink}
              exact to='/'
              name='Home'
              routerid='home'
              onClick={()=> this.toggleSideBar()}>
              <span><Icon name='home'/>Home</span>
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to='/restaurants'
              name='Restaurants'
              routerid='restaurants'
              onClick={()=> this.toggleSideBar()}>
              <span><Icon name='food' />Restaurants</span>
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to='/about'
              name='About'
              routerid='about'
              onClick={()=> this.toggleSideBar()}>
              <span><Icon name='question circle outline' />About</span>
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to='/1909-json-placeholder'
              name='JsonPlaceholder'
              routerid='1909-json-placeholder'
              onClick={()=> this.toggleSideBar()}>
              <span><Icon name='table' />Json Placeholder</span>
            </Menu.Item>

            
          </Sidebar>

          <Sidebar.Pusher dimmed={sideBarVisible}>
            <div className='content-panel'>
              <Container className='content-panel-container'>
              <Route exact path='/' component={HomePage} />
              <Route path='/about' component={AboutPage} />
              <Route path='/restaurants' component={Restaurant} />
              <Route path='/1909-json-placeholder' component={JsonPlaceholder} />
              </Container>
            </div>
          </Sidebar.Pusher>

        </Sidebar.Pushable></BrowserRouter>
        
			</div>
		)
	}
}