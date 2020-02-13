// not being used
import React from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  deleteItem,
  editItem,
  addItem,
} from '../../shared/store/actions/restaurantActions';

class ItemModal extends React.Component {
  state = {
    modalOpen: false,
    item: this.props.item,
  };
  onComponentMount() {}

  handleChange = e => {
    let elem = e.target;
    if (elem.id === 'price' && elem.value <= 0) elem.value = 0;
    this.setState({
      item: {
        ...this.state.item,
        [e.target.id]: e.target.value,
      },
    });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  addData = () => {
    this.props.addItem(this.state.item);
    this.closeModal();
  };

  editData = () => {
    this.props.editItem(this.state.item);
    this.closeModal();
  };

  deleteData = () => {
    this.props.deleteItem(this.props.item.id);
    this.closeModal();
  };

  log = () => {
    console.log('search');
  };
  render() {
    let action = {
      edit: { title: 'Edit', color: 'blue' },
      delete: { title: 'Delete', color: 'red' },
      add: { title: 'Add', color: 'green' },
    };

    let actionButton;

    if (this.props.type === 'add') {
      actionButton = (
        <Button type='button' color={action.add.color} onClick={this.addData}>
          Add
        </Button>
      );
    } else if (this.props.type === 'delete') {
      actionButton = (
        <Button type='button' color={action.delete.color} onClick={this.deleteData}>
          Delete
        </Button>
      );
    } else if (this.props.type === 'edit') {
      actionButton = (
        <Button type='button' color={action.edit.color} onClick={this.editData}>
          Edit
        </Button>
      );
    }

    return (
      <Modal
        trigger={
          <Button
            color={action[this.props.type].color}
            size='mini'
            onClick={() => this.openModal()}>
            <Icon name={this.props.type}></Icon>
            {action[this.props.type].title}
          </Button>
        }
        open={this.state.modalOpen}
        onClose={() => {
          this.closeModal();
        }}>
        <Modal.Header>
          {action[this.props.type].title} restaurant: {this.props.item.name}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16} disabled>
                <label>Google Map Link</label>
                <Input
                  defaultValue={this.props.item.mapLink}
                  onBlur={this.handleChange}
                  type='text'
                  id='mapLink'
                  readOnly={this.props.type === 'delete'}
                  action={<Button onClick={this.log}>Apply Map Link</Button>}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group>
              <Form.Field
                label='Name'
                control='input'
                defaultValue={this.props.item.name}
                onBlur={this.handleChange}
                type='text'
                id='name'
                readOnly={this.props.type === 'delete'}
                width={6}
                required
              />
              <Form.Field
                label='Address'
                control='input'
                defaultValue={this.props.item.address}
                onBlur={this.handleChange}
                type='text'
                id='address'
                readOnly={this.props.type === 'delete'}
                width={8}
                required
              />
              <Form.Field
                label='Price'
                control='input'
                defaultValue={this.props.item.price}
                onBlur={this.handleChange}
                type='number'
                id='price'
                readOnly={this.props.type === 'delete'}
                width={2}
              />
            </Form.Group>
            <Form.TextArea
              label='Comments ( additional info )'
              defaultValue={this.props.item.comments}
              onBlur={this.handleChange}
              id='comments'
              readOnly={this.props.type === 'delete'}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='button' onClick={this.closeModal}>
            Cancel
          </Button>
          {actionButton}
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => {
      dispatch(deleteItem(id));
    },
    editItem: item => {
      dispatch(editItem(item));
    },
    addItem: item => {
      dispatch(addItem(item));
    },
  };
};

export default connect(null, mapDispatchToProps)(ItemModal);
