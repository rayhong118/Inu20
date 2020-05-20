import React from 'react';
import { Modal, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateFilterTags } from '../../shared/store/actions/restaurantActions';

class FilterTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
      selectedTags: props.filter.selectedTags || [],
      modalOpen: false,
    };
  }

  toggle = (e, { value }) => {
    console.log(value);
    const selectedTags = this.state.selectedTags;
    if (selectedTags.includes(value))
      this.setState({
        selectedTags: selectedTags.filter((selectedTag) => selectedTag !== value),
      });
    else this.setState({ selectedTags: [...selectedTags, value] });
  };

  applyTags = () => {
    let tags = this.state.selectedTags;
    this.props.updateFilterTags(tags);
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    let tags = this.props.tags || [];
    return (
      <Modal
        trigger={
          <Button size='mini' onClick={() => this.setState({ modalOpen: true })}>
            Filter By Tags{' '}
            {this.state.selectedTags.length
              ? '(' + this.state.selectedTags.length + ')'
              : null}
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.closeModal}>
        <Modal.Header>
          Filter By Tags{' '}
          {this.state.selectedTags.length
            ? '(' + this.state.selectedTags.length + ')'
            : null}
        </Modal.Header>
        <Modal.Content className='filter-by-tags'>
          {tags.map((tag) => (
            <Checkbox
              key={tag.id}
              value={tag.value}
              label={tag.text + '(' + tag.count + ')'}
              onChange={this.toggle}
              defaultChecked={this.state.selectedTags.includes(tag.value)}
            />
          ))}
          current tags: {this.state.selectedTags.join(', ')}{' '}
          {this.state.selectedTags.length}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button color='blue' onClick={this.applyTags}>
            Apply
          </Button>
        </Modal.Actions>
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateFilterTags: (tags) => {
      dispatch(updateFilterTags(tags));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['restaurant-tags'])
)(FilterTags);
