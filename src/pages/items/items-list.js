import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react';
import ItemModal from './item-modal';

const ItemsList = ({ items, deleteItem, editItem }) => {

  const itemsList = items.map( item => {
    return (

    <Segment key = { item.id } color = 'teal'>
      <Header>{ item.name }</Header>
      <div>address: { item.address }</div>
      <div>price: { item.price }</div>
        <ItemModal item={item} type={'edit'}></ItemModal>
        <ItemModal item={item} type={'delete'}></ItemModal>

    </Segment>
    );
  });
  return (
    <div>
      { itemsList }
    </div>
  )
}

//export default connect()(ItemsList);
export default ItemsList;
