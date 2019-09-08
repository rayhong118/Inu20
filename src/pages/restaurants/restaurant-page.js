import React from 'react';
import {Container, Message, Icon} from 'semantic-ui-react'
import ItemsList from './restaurant-list';
import ItemModal from './restaurant-modal';
import { connect, Provider } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../../shared/store/reducers/rootReducer';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import thunk from 'redux-thunk';
import firebaseConfig from '../../config/firebaseConfig';

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig)
  )
);

class Restautant extends React.Component {

  render() {
    
    return(
      <Provider store = {store}>
        <Container>
          <ItemModal item={ {} } type={'add'}></ItemModal>
          {this.props.items ? (
            <div>Total number of items: {this.props.items.length}
              <ItemsList items={this.props.items}/>
            </div>
          ) : (
            <Message color='red'>
              <Icon name='circle notch' loading={true}></Icon>
              No item here
            </Message>
          )}
        </Container>
      </Provider>
    )
  }
    
}

const mapStateToProps = (state) => {
  return{
    items: state.firestore.ordered.restaurants
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'restaurants' }
  ])
)(Restautant);