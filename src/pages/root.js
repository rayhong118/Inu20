import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Container, Sidebar, Segment, Menu, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AboutPage from './about/about';
import Restaurant from './restaurants/restaurant-page';
import HomePage from './home/home';
import JsonPlaceholder from './1909-json-placeholder/json-placeholder';
import NoMatch from './404/NoMatch';
import WIP from './404/WIP';
import SignIn from '../shared/components/sign-in';
import Footer from '../shared/components/footer';

import React from 'react';

class Root extends React.Component {
  state = {
    sideBarVisible: false,
  };

  toggleSideBar() {
    let newState = this.state.sideBarVisible;
    this.setState({ sideBarVisible: !!newState ? false : true });
  }

  handleOutSideClick(e) {
    if (!e) return;
    console.log(e);
    e.stopPropagation();
    if (e.target.name !== 'SideBarToggle') {
      this.setState({ sideBarVisible: false });
    }
  }

  render() {
    const { sideBarVisible } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexFlow: 'column nowrap',
          position: 'sticky',
        }}>
        <Menu secondary className='top-bar'>
          <Menu.Item onClick={() => this.toggleSideBar()}>
            <Icon id='SideBarToggle' name='bars' />
          </Menu.Item>
          <Menu.Item header fitted='horizontally'>
            <a id='headerTitle' href='/'>
              Inu20
            </a>
          </Menu.Item>
          <Menu.Item>
            <SignIn></SignIn>
          </Menu.Item>
        </Menu>

        <BrowserRouter>
          <Sidebar.Pushable className='main-panel'>
            <Sidebar
              as={Menu}
              animation='overlay'
              direction='left'
              onHide={e => this.handleOutSideClick(e)}
              vertical
              visible={sideBarVisible}
              className='side-bar'>
              <Menu.Item
                as={NavLink}
                exact
                to='/'
                name='Home'
                routerid='home'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='home' />
                  Home
                </span>
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to='/restaurants'
                name='Restaurants'
                routerid='restaurants'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='food' />
                  Restaurants
                </span>
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to='/about'
                name='About'
                routerid='about'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='question circle outline' />
                  About
                </span>
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to='/1909-json-placeholder'
                name='JsonPlaceholder'
                routerid='1909-json-placeholder'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='table' />
                  Json Placeholder
                </span>
              </Menu.Item>
              <Menu.Item>
                Comics
                <Menu.Menu>
                  <Menu.Item
                    as={NavLink}
                    //to='/doghead-comics-en'
                    to='/wip'
                    name='Doghead Comics'
                    routerid='doghead-comics-en'
                    onClick={() => this.toggleSideBar()}>
                    <span>
                      Doghead Comics{'   '}
                      <Label color='blue' size='tiny' horizontal>
                        EN
                      </Label>
                    </span>
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sideBarVisible}>
              <div className='content-panel'>
                <div className='content-panel-container'>
                  <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/about' component={AboutPage} />
                    <Route path='/restaurants' component={Restaurant} />
                    <Route path='/1909-json-placeholder' component={JsonPlaceholder} />
                    <Route path='/wip' component={WIP} />
                    <Route component={NoMatch} />
                  </Switch>
                </div>
                <Footer></Footer>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps)(Root);
