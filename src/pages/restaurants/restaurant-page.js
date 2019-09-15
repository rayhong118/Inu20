import React from 'react';
import {Container, Message, Icon} from 'semantic-ui-react'
import ItemsList from './restaurant-list';
import ItemModal from './restaurant-modal';
import { connect, Provider } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';





class Restautant extends React.Component {
  
  render() {
    
    return(

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