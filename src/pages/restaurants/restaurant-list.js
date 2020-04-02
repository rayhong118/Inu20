import React from 'react';
import { Segment, Message, Icon, Button } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './restaurant.css';

class ItemsList extends React.Component {
  //{ items, order, searchText } = this.props;
  state = { items: [], authId: '', portalOpen: false, randomItem: null, map: null };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  filterItems = items => {
    return this.props.searchText
      ? [...items].filter(item =>
          item.name.toUpperCase().includes(this.props.searchText.toUpperCase())
        )
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
    else {
      let processedList = this.state.items
        ? this.sortItems(this.filterItems(this.state.items))
        : [];
      return (
        <div>
          {this.state.randomItem ? (
            <Segment className='random-select-container'>
              {this.state.randomItem ? (
                <div>
                  <h3>{this.state.randomItem.name}</h3>

                  <a href={this.state.randomItem.url}>
                    <Icon name='map marker alternate' color='grey' />
                    {this.state.randomItem.address}
                  </a>
                  <p>${this.state.randomItem.price}</p>

                  <p>{this.state.randomItem.comments}</p>
                </div>
              ) : (
                'Random Select'
              )}
              <Button
                basic
                onClick={() => {
                  this.setState({ randomItem: null });
                }}
                size='mini'
                content='Close'
                icon='close'
                color='red'
              />
            </Segment>
          ) : (
            ''
          )}

          <ItemModal
            map={this.state.map}
            item={{}}
            type={'add'}
            disabled={!this.props.auth.uid}></ItemModal>
          <Button
            size='tiny'
            disabled={!this.state.items || !this.state.items.length}
            onClick={this.displayRandom}
            content={'Random Select'}
            icon='random'
          />

          <p>Number of results: {processedList ? processedList.length : 0}</p>
          {this.state.items ? (
            processedList.map(item => (
              <Segment key={item.id} color='blue'>
                <h3 className='item-title'>{item.name}</h3>

                <a href={item.url}>
                  <Icon name='map marker alternate' color='grey' />
                  {item.address}
                </a>

                <div className='price'>
                  {' '}
                  <Icon name='dollar sign' color='grey' />
                  {item.price}
                </div>

                {item.comments ? (
                  <div className='comments'>
                    <span>Comments:</span>
                    <div>{item.comments}</div>
                  </div>
                ) : (
                  ''
                )}

                <ItemModal map={this.state.map} item={item} type={'edit'}></ItemModal>
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
