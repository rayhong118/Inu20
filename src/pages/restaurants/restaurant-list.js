import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';

const ItemsList = ({ items, order, searchText }) => {
  // console.log(order);
  // console.log(searchText);
  let filteredItems = searchText
    ? [...items].filter((item) => item.name.includes(searchText))
    : [...items];

  let sortedItems = [];
  switch (order) {
    case 'PL2H':
      sortedItems = filteredItems.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    case 'PH2L':
      sortedItems = filteredItems.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    default:
      sortedItems = filteredItems.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;
  }
  const itemsList = sortedItems.map((item) => {
    return (
      <Segment key={item.id} color='teal'>
        <Header>{item.name}</Header>
        <div>Address: {item.address}</div>
        <div>Price: {item.price}</div>
        {item.comments ? <div>Comments: {item.comments}</div> : ''}
        <ItemModal item={item} type={'edit'}></ItemModal>
        <ItemModal item={item} type={'delete'}></ItemModal>
      </Segment>
    );
  });
  return (
    <div>
      <div>Number of results: {sortedItems.length}</div>
      {itemsList}
    </div>
  );
};

export default ItemsList;
