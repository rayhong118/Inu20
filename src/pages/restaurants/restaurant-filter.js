import React from 'react';
import { connect } from 'react-redux';
import { Segment, Input, Dropdown, List } from 'semantic-ui-react';
import { updateFilter } from '../../shared/store/actions/restaurantActions';

const listOrder = [
  { key: 'Default', value: 'Default', text: 'Default' },
  { key: 'PL2H', value: 'PL2H', text: 'Price: Low to high' },
  { key: 'PH2L', value: 'PH2L', text: 'Price: High to low' },
];
class RestaurantFilter extends React.Component {
  state = {
    searchText: '',
    order: '',
    minPrice: 0,
    maxPrice: 0,
  };

  componentDidUpdate() {
    this.props.updateFilter({ ...this.state });
  }

  handleSearchInput = (e, { value }) => {
    let fieldName = e.target.id;
    if (fieldName.includes('Price')) value = Math.max(parseInt(value), 0);
    this.setState({ [fieldName]: value });
  };

  handleOrderChange = (e, { value }) => {
    e.target.id = 'order';
    this.handleSearchInput(e, { value });
  };

  setPriceRange(min, max) {
    this.setState({ minPrice: min, maxPrice: max });
  }

  render() {
    return (
      <Segment.Group>
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
            onChange={this.handleOrderChange}
          />
          <br />
          <label>Price Range</label>
          <div className='price-range'>
            <Input
              value={this.state.minPrice || ''}
              type='number'
              id='minPrice'
              onChange={this.handleSearchInput}
              placeholder='Min'
            />
            <span style={{ padding: '0.5rem' }}>-</span>
            <Input
              value={this.state.maxPrice || ''}
              type='number'
              id='maxPrice'
              onChange={this.handleSearchInput}
              placeholder='Max'
            />
          </div>

          <List link>
            <List.Item as='a' onClick={() => this.setPriceRange(0, 0)}>
              Clear Min {'&'} Max
            </List.Item>
            <List.Item as='a' onClick={() => this.setPriceRange(0, 19)}>
              Less than $20
            </List.Item>
            <List.Item as='a' onClick={() => this.setPriceRange(20, 39)}>
              $20 - $39
            </List.Item>
            <List.Item as='a' onClick={() => this.setPriceRange(40, 0)}>
              More than $40
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return { filter: state.filter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filter) => {
      dispatch(updateFilter(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilter);
