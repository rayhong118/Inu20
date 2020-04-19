import React from 'react';
import { Message, Icon, Grid, Container } from 'semantic-ui-react';
import ItemsList from './restaurant-list';
import { connect } from 'react-redux';
import RestaurantFilter from './restaurant-filter';
import './restaurant.css';

class Restautant extends React.Component {
  render() {
    if (this.props.auth.uid)
      return (
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <RestaurantFilter></RestaurantFilter>
              </Grid.Column>

              <Grid.Column width={12}>
                <ItemsList auth={this.props.auth} />
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
