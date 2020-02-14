import React from 'react';
import { Segment, Header, Message, Icon } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ItemsList extends React.Component {
  //{ items, order, searchText } = this.props;
  state = { items: [], authId: '' };
  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  filterItems = items => {
    console.log(this.props);
    console.log(this.state);
    return this.props.searchText
      ? [...items].filter(item => item.name.includes(this.props.searchText))
      : [...items];
  };

  sortItems = filteredItems => {
    console.log(this.props);
    console.log(this.state);
    switch (this.props.order) {
      case 'PL2H':
        return filteredItems.sort((a, b) => {
          return a.price - b.price;
        });
      case 'PH2L':
        return filteredItems.sort((a, b) => {
          return b.price - a.price;
        });

      default:
        return filteredItems.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let rawItems = nextProps.items;

    return {
      items: rawItems,
      authId: nextProps.auth.uid,
    };
  }

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
          <div>Number of results: {this.state.items ? this.state.items.length : 0}</div>

          {this.state.items ? (
            this.sortItems(this.filterItems(this.state.items)).map(item => {
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
            })
          ) : (
            <Message color='yellow'>
              <Icon name='circle notch' loading={true}></Icon>
              loading...
            </Message>
          )}
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    items: state.firestore.ordered.restaurants,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'restaurants' }])
)(ItemsList);
