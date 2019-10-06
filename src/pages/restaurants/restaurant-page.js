import React from 'react';
import {Container, Message, Icon, Select} from 'semantic-ui-react'
import ItemsList from './restaurant-list';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';

const listOrder = [
  {key: 'Default', value: 'Default', text:'Default'},
  {key: 'PL2H', value: 'PL2H', text:'Price: Low to high'},
  {key: 'PH2L', value: 'PH2L', text:'Price: High to low'}
]

class Restautant extends React.Component {
  state = {
    order: null
  }
  handleChange = (e, {value}) => {
    this.setState({order:value});
    switch(value){
      case 'PL2H':
        this.props.items.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'PH2L':
        this.props.items.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      default:
        this.props.items.sort((a, b) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        });
        break;
    }

    
  }
  
  render() {
    return(
      <Container>
        <ItemModal item={ {} } type={'add'}></ItemModal>
        <Select placeholder='Order items' options={listOrder} value={this.state.order} onChange={this.handleChange}/>
        
        {this.props.items ? (
          <div>Total number of items: {this.props.items.length}
            <ItemsList items={this.props.items} order={this.state.order}/>
          </div>
        ) : (
          <Message color='yellow'>
            <Icon name='circle notch' loading={true}></Icon>
            loading...
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