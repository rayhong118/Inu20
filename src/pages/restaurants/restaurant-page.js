import React from 'react';
import {
  Message,
  Icon,
  Dropdown,
  Input,
  Grid,
  Segment,
  Container,
} from 'semantic-ui-react';
import ItemsList from './restaurant-list';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './restaurant.css';

const listOrder = [
  { key: 'Default', value: 'Default', text: 'Default' },
  { key: 'PL2H', value: 'PL2H', text: 'Price: Low to high' },
  { key: 'PH2L', value: 'PH2L', text: 'Price: High to low' },
];

class Restautant extends React.Component {
  state = {
    order: null,
    searchText: '',
  };
  handleChange = (e, { value }) => {
    this.setState({ order: value });
  };
  handleSearchInput = (e, { value }) => {
    this.setState({ searchText: value });
  };
  logState = () => {
    console.log(this.props);
    console.log(this.state);
  };

  render() {
    return (
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment>
                <label>Filter by name:</label>
                <Input
                  fluid
                  value={this.state.searchText}
                  type='text'
                  id='search'
                  onChange={this.handleSearchInput}
                  placeholder='Filter by name'
                />
                <br />
                <label>Order of items:</label>
                <Dropdown
                  fluid
                  className='tiny'
                  placeholder='Default'
                  selection
                  options={listOrder}
                  value={this.state.order}
                  onChange={this.handleChange}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column width={12}>
              {this.props.error}
              {
                //<button onClick={this.logState}>logstate</button>
              }
              <ItemModal item={{}} type={'add'}></ItemModal>
              {this.props.items ? (
                <div>
                  <ItemsList
                    items={this.props.items}
                    order={this.state.order}
                    searchText={this.state.searchText}
                  />
                </div>
              ) : this.props.err ? (
                <div>ERROR</div>
              ) : (
                <Message color='yellow'>
                  <Icon name='circle notch' loading={true}></Icon>
                  loading...
                </Message>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.firestore.ordered.restaurants,
    auth: state.firebase.auth,
    error: state.firebase.error,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'restaurants' }])
)(Restautant);
