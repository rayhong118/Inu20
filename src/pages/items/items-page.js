import React from 'react';
import {Container, Message} from 'semantic-ui-react'
import ItemsList from './items-list';
import AddItem from './add-item';
import ItemModal from './item-modal';
import { connect } from 'react-redux';


class Restautant extends React.Component {


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
        {this.props.items.length > 0 ? (
          <div>Total number of items: {this.props.items.length}
            <ItemsList items={this.props.items} deleteItem={this.deleteItem} editItem={this.editItem}/>
          </div>
        ) : (
          <Message color='red'>No item here</Message>
        )}
        <AddItem addItem={this.addItem}></AddItem>
      </Container>
    )
  }
    
}

const mapStateToProps = (state) => {
  return{
    items: state.items
  }
}

export default connect(mapStateToProps)(Restautant);