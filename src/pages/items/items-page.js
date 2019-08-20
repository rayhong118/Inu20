import React from 'react';
import {Container, Message} from 'semantic-ui-react'
import ItemsList from './items-list';
import AddItem from './add-item';
import ItemModal from './item-modal';


export default class Restautant extends React.Component {
  state = {
    items: [
      { id: '1', name: 'item1', address: '999 N 1st St.', price: '30'},
      { id: '2', name: 'item2', address: '345 Avanida Nagolas', price: '27'},
      { id: '3', name: 'item3', address: '408 Gaucho Way', price: '37'},
      { id: '4', name: 'item4', address: '281 Hunolt St', price: '37'},
    ],
  }

  addItem = (item) => {
    item.id = Math.random();
    let items = [...this.state.items, item];
    this.setState({items: items});
  }

  deleteItem = (id) => {
    
    let items = this.state.items.filter(item => {
        return item.id !== id;
    });
    this.setState({
      items: items
    });
    console.log(this.state.items);
  }

  editItem = (modifiedItem) => {
    console.log(modifiedItem.key);
    this.setState( prevState => ({
      items: prevState.items.map(
        el => el.key === modifiedItem.key ? {...el, name: modifiedItem.name, address: modifiedItem.address, price: modifiedItem.price} : el
      )
    }));
  }

  render() {
    const emptyItem = { }
    return(
      <Container>
        <ItemModal item={ {} } type={'add'}></ItemModal>
        {this.state.items.length > 0 ? (
          <div>Total number of items: {this.state.items.length}
            <ItemsList items={this.state.items} deleteItem={this.deleteItem} editItem={this.editItem}/>
          </div>
        ) : (
          <Message color='red'>No item here</Message>
        )}
        <AddItem addItem={this.addItem}></AddItem>
      </Container>
    )
  }
    
}