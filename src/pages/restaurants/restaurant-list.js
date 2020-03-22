import React from 'react';
import { Segment, Message, Icon, Portal, Button } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './restaurant.css';

class ItemsList extends React.Component {
  //{ items, order, searchText } = this.props;
  state = { items: [], authId: '', portalOpen: false, randomItem: null };
  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  filterItems = items => {
    return this.props.searchText
      ? [...items].filter(item => item.name.includes(this.props.searchText))
      : [...items];
  };

  sortItems = filteredItems => {
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

  handlePortalOpen = () => {
    this.setState({ portalOpen: true });
  };

  handlePortalClose = () => {
    this.setState({ portalOpen: false });
  };

  displayRandom = () => {
    let filteredList = this.sortItems(this.filterItems(this.state.items));
    let index = Math.floor(Math.random() * filteredList.length);
    let randomItem = filteredList[index];
    this.setState({ randomItem });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let rawItems = nextProps.items;

    return {
      items: rawItems,
      //authId: nextProps.auth.uid,
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
          <ItemModal item={{}} type={'add'} disabled={!this.props.auth.uid}></ItemModal>
          <Portal
            openOnTriggerClick
            trigger={
              <Button
                size='mini'
                disabled={!this.state.items || !this.state.items.length}
                onClick={this.displayRandom}
                content={'Random Select'}
              />
            }
            onOpen={this.handlePortalOpen}
            onClose={this.handlePortalClose}>
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '40%',
                zIndex: 10,
              }}>
              <h2>
                {this.state.randomItem ? (
                  <div>
                    <a href=''>
                      <h2>{this.state.randomItem.name}</h2>
                    </a>
                    <div className='address-row'>
                      <span>
                        <Icon name='map marker alternate' color='grey' />
                        {this.state.randomItem.address}
                      </span>
                      <span className='price'>${this.state.randomItem.price}</span>
                    </div>

                    <h4>{this.state.randomItem.comments}</h4>
                  </div>
                ) : (
                  'Error'
                )}
              </h2>
            </Segment>
          </Portal>

          <div>Number of results: {this.state.items ? this.state.items.length : 0}</div>
          {this.state.items ? (
            this.sortItems(this.filterItems(this.state.items)).map(item => (
              <Segment key={item.id} color='blue'>
                <h3 className='item-title'>{item.name}</h3>
                <div className='address-row'>
                  <span>
                    <Icon name='map marker alternate' color='grey' />
                    {item.address}
                  </span>
                  <span className='price'> ${item.price}</span>
                </div>

                {item.comments ? (
                  <div className='comments'>
                    <span>Comments:</span>
                    <div>{item.comments}</div>
                  </div>
                ) : (
                  ''
                )}

                <ItemModal item={item} type={'edit'}></ItemModal>
                <ItemModal item={item} type={'delete'}></ItemModal>
              </Segment>
            ))
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
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'restaurants' }])
)(ItemsList);
