import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AboutPage from './about/about';
import Restaurant from './restaurants/restaurant-page';
import HomePage from './home/home';
import NoMatch from './404/NoMatch';
import WIP from './404/WIP';
import DogheadZh from './comics/doghead-zh';
import User from '../shared/components/user/user-modal';
import Footer from '../shared/components/footer';

import React from 'react';
import Clock from './clock/clock';
import AccountActions from '../shared/components/user/account-actions';

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
    e.stopPropagation();
    if (e.target.name !== 'SideBarToggle') {
      this.setState({ sideBarVisible: false });
    }
  }

  toggleDim = () => {
    document.body.classList.toggle('dim');
  };
  render() {
    return (
      <BrowserRouter>
        <Menu secondary className='top-bar'>
          <Menu.Item header>
            <Dropdown icon='bars' className='menu-icon'>
              <Dropdown.Menu className='dropdown-menu'>
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

                <Dropdown.Divider />
                <Dropdown.Item
                  as={NavLink}
                  to='/doghead-zh/'
                  name='狗头漫画'
                  routerid='doghead-comics-zh'
                  onClick={() => this.toggleSideBar()}>
                  <span>狗头漫画{'   '}</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  as={NavLink}
                  to='/clock/'
                  name='Clock'
                  routerid='clock'
                  onClick={() => this.toggleSideBar()}>
                  <span>
                    <Icon name='clock outline' />
                    Clock{'   '}
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={this.toggleDim}>Toggle Dim Mode</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item header fitted='horizontally'>
            <a id='headerTitle' href='/'>
              Inu20
            </a>
          </Menu.Item>
          <Menu.Item position='right'>
            <div>
              <User auth={this.state.auth} />
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
            <Route path='/clock' component={Clock} />
            <Route path='/account-actions' component={AccountActions} />
            <Route component={NoMatch} />
          </Switch>
        </div>

        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Root);
