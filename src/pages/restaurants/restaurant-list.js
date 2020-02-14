import React from 'react';
import { Segment, Header, Message, Icon } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ItemsList extends React.Component {
  //{ items, order, searchText } = this.props;
  filteredItems = this.props.searchText
    ? [...this.props.items].filter((item) => item.name.includes(this.props.searchText))
    : [...this.props.items];

  sortedItems = [];

  itemsList = this.props.sortedItems.map((item) => {
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
  render() {
    if (!this.props.auth.uid)
      return (
        <Message color='red'>
          <Icon name='warning circle'></Icon>
          In order to access the content on this page, you need to sign in first.
        </Message>
      );
    else
      return (
        <div>
          <div>Number of results: {this.sortedItems.length}</div>
          {this.itemsList}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.firestore.ordered.restaurant,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'restaurant' }])
)(ItemsList);
