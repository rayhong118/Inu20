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
import { connect } from 'react-redux';
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
    minPrice: 0,
    maxPrice: 0,
    filterFields: {
      priceMax: 0,
      priceMin: 0,
      text: '',
      tags: [],
    },
  };

  handleSearchInput = (e, { value }) => {
    console.log(e, value);
    if (e.target.id.includes('Price'))
      this.setState({ [e.target.id]: Math.max(parseInt(value), 0) });
    else this.setState({ [e.target.id]: value });
  };

  render() {
    if (this.props.auth.uid)
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
                    id='searchText'
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
                    id='order'
                    onChange={this.handleSearchInput}
                  />
                  <br />
                  <label>Price Range</label>
                  <Input
                    value={this.state.minPrice || 0}
                    type='number'
                    id='minPrice'
                    onChange={this.handleSearchInput}
                    placeholder='Min Price'
                  />
                  -
                  <Input
                    value={this.state.maxPrice || 0}
                    type='number'
                    id='maxPrice'
                    onChange={this.handleSearchInput}
                    placeholder='Max Price'
                  />
                </Segment>
              </Grid.Column>

              <Grid.Column width={12}>
                {
                  //<button onClick={this.logState}>logstate</button>
                }

                <ItemsList
                  order={this.state.order}
                  searchText={this.state.searchText}
                  auth={this.props.auth}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    else
      return (
        <Container>
          <Message color='red'>
            <Icon name='warning circle'></Icon>
            In order to access the content on this page, you need to sign in first.
          </Message>
        </Container>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    error: state.firebase.error,
  };
};

export default connect(mapStateToProps)(Restautant);
