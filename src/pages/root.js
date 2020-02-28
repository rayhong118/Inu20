import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Dropdown, Menu, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AboutPage from './about/about';
import Restaurant from './restaurants/restaurant-page';
import HomePage from './home/home';
import NoMatch from './404/NoMatch';
import WIP from './404/WIP';
import DogheadZh from './comics/doghead-zh';
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
      <BrowserRouter>
        <Menu secondary className='top-bar'>
          <Menu.Item as={Dropdown} icon='bars'>
            <Dropdown.Menu>
              <Dropdown.Item
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
              </Dropdown.Item>

              <Dropdown.Item
                as={NavLink}
                to='/restaurants'
                name='Restaurants'
                routerid='restaurants'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='food' />
                  Restaurants
                </span>
              </Dropdown.Item>

              <Dropdown.Item
                as={NavLink}
                to='/about'
                name='About'
                routerid='about'
                onClick={() => this.toggleSideBar()}>
                <span>
                  <Icon name='question circle outline' />
                  About
                </span>
              </Dropdown.Item>

              <Dropdown.Item
                as={NavLink}
                to='/doghead-zh/'
                name='狗头漫画'
                routerid='doghead-comics-zh'
                onClick={() => this.toggleSideBar()}>
                <span>狗头漫画{'   '}</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Menu.Item>
          <Menu.Item header fitted='horizontally'>
            <a id='headerTitle' href='/'>
              Inu20
            </a>
          </Menu.Item>
          <Menu.Item position='right'>
            <div>
              <SignIn auth={this.state.auth}></SignIn>
            </div>
          </Menu.Item>
        </Menu>

        <div className='content-panel-container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/restaurants' component={Restaurant} />
            <Route path='/wip' component={WIP} />
            <Route path='/doghead-zh/:epid?' component={DogheadZh} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Root);
