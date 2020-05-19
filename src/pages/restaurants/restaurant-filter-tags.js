import React from 'react';
import { Modal, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class FilterTags extends React.Component {
  state = {
    selectedTags: [],
  };
  toggle = (e, { value }) => {
    console.log(value);
  };
  render() {
    const tags = this.props.tags || [];
    return (
      <Modal trigger={<Button size='mini'>Filter by tags</Button>}>
        <Modal.Header>Filter By Tags</Modal.Header>
        <Modal.Content>
          {tags.map((tag) => (
            <Checkbox
              key={tag.id}
              value={tag.id}
              label={tag.text + '(' + tag.count + ')'}
              onChange={this.toggle}
            />
          ))}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.firestore.ordered['restaurant-tags'],
    filter: state.restaurant.filter,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['restaurant-tags'])
)(FilterTags);
