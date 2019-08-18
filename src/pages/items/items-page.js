import React from 'react';
import {Container, Message} from 'semantic-ui-react'
import ItemsList from './items-list';
import AddItem from './add-item';


export default class Restautant extends React.Component {
  state = {
    items: [
      { id: '1', name: 'item1', address: '990 N 1st St.', price: '30'},
      { id: '2', name: 'item2', address: '312 Avanida Nagolas', price: '27'},
      { id: '3', name: 'item3', address: '4087 Gaucho Way', price: '37'}
    ],
  }


  addItem = (item) => {
    item.id = Math.random();
    let items = [...this.state.items, item];
    this.setState({items: items});
  }

  deleteItem = (id) => {
    console.log(id);
    let items = this.state.items.filter(item => {
        return item.id !== id;
    });
    this.setState({
      items: items
    });
  }

  editItem = (item) => {
    console.log(item.key);
    this.setState( prevState => ({
      items: prevState.items.map(
        el => el.key === item.key ? {...el, name: item.name, address: item.address, price: item.price} : el
      )
    }));
  }

  render() {
    return(
      <Container>
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