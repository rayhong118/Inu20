import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Sidebar, Menu, Icon, Label } from 'semantic-ui-react';
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
        <Sidebar.Pushable className='main-panel'>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            onHide={(e) => this.handleOutSideClick(e)}
            vertical
            visible={sideBarVisible}>
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

            <Menu.Item>
              Comics
              <Menu.Menu>
                <Menu.Item
                  as={NavLink}
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
                <Menu.Item
                  as={NavLink}
                  to='/doghead-zh/1'
                  name='狗头漫画'
                  routerid='doghead-comics-zh'
                  onClick={() => this.toggleSideBar()}>
                  <span>
                    狗头漫画{'   '}
                    <Label color='blue' size='tiny' horizontal>
                      ZH
                    </Label>
                  </span>
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sideBarVisible}>
            <div className='content-panel'>
              <Menu secondary className='top-bar'>
                <Menu.Item onClick={() => this.toggleSideBar()}>
                  <Icon id='SideBarToggle' name='bars' />
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
                  <Route path='/doghead-zh/:epid' component={DogheadZh} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <Footer></Footer>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Root);
