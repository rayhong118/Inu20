import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, NavLink} from 'react-router-dom';
import { Container, Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import './index.css';

// import Navbar from './components/navbar';
import AboutPage from './pages/about/about';
import Restaurant from './pages/restaurants/restaurant-page';
import HomePage from './pages/home/home'

import rootReducer from './shared/store/reducers/rootReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'

import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

import thunk from 'redux-thunk';
import firebaseConfig from './config/firebaseConfig';

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
);

class Root extends React.Component {
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
        <Menu secondary className='header'>
          <Menu.Item onClick={()=> this.toggleSideBar()}>
            <Icon id="SideBarToggle" name='bars'/>
          </Menu.Item>
          <Menu.Item header>
            title
          </Menu.Item>
        </Menu>

        <BrowserRouter>
          <Sidebar.Pushable className='main-panel'>
            <Sidebar 
              as={Menu}
              animation='overlay'
              direction='left'
              inverted
              onHide={(e) => this.handleOutSideClick(e)}
              vertical
              visible={sideBarVisible}>
              <Menu.Item as={NavLink} exact to='/' onClick={()=> this.toggleSideBar()}
              name='Home'
              routerid='home'>
                <span><Icon name='home'/>Home</span>
              </Menu.Item>

              <Menu.Item as={NavLink} to='/restaurants' onClick={()=> this.toggleSideBar()}
                name='Restaurants'
                routerid='restaurants'>
                <span><Icon name='food' />Restaurants</span>
              </Menu.Item>

              <Menu.Item as={NavLink} to='/about' onClick={()=> this.toggleSideBar()}
                name='About'
                routerid='about'>
                <span><Icon name='question circle outline' />About</span>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sideBarVisible}>
              <Segment className='content'>
                <Container>
                <Route exact path='/' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/restaurants' component={Restaurant} />
                </Container>
              </Segment>
            </Sidebar.Pusher>

          </Sidebar.Pushable>
        </BrowserRouter>
        
			</div>
		)
	}
}

ReactDOM.render(
  <Provider store = {store}>
    <ReactReduxFirebaseProvider
     firebase={firebaseConfig}
     config={firebaseConfig}
     dispatch={store.dispatch}
     createFirestoreInstance={createFirestoreInstance}>
       <Root />
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'));
