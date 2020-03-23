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
    isFormValid: false,
  };

  handleChange = e => {
    let elem = e.target;
    if (elem.id === 'price' && elem.value <= 0) elem.value = 0;

    let item = {
      ...this.state.item,
      [e.target.id]: e.target.value,
    };

    this.validateForm(item);
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
    this.setState({ item: this.props.item });
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

  getPlaceDetails = () => {
    console.log(this.state);
    if (!this.state.item.placeId) {
      console.log('no place id');
      return;
    }
    console.log('place id exist');
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });
    const request = {
      placeId: this.state.item.placeId,
      fields: ['name', 'formatted_address'],
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(place.name, place.formatted_address);
        let item = { name: place.name, address: place.formatted_address };
        this.validateForm(item);
      }
    });
  };

  validateForm = item => {
    const isValid = item.name && item.address && !!parseInt(item.price);
    this.setState({ isFormValid: isValid, item });
    console.log(this.state);
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
        <Button
          type='button'
          color={action.add.color}
          onClick={this.addData}
          disabled={!this.state.isFormValid}>
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
        <Button
          type='button'
          color={action.edit.color}
          onClick={this.editData}
          disabled={!this.state.isFormValid}>
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
              <Form.Field width={16} required readOnly={this.props.type === 'delete'}>
                <label>Add Place by Google Map Link</label>
                <Input
                  defaultValue={this.props.item.mapLink}
                  onBlur={this.handleChange}
                  type='text'
                  id='placeId'
                  readOnly={this.props.type === 'delete'}
                  action={
                    <Button type='button' onClick={this.getPlaceDetails}>
                      Add Map Link
                    </Button>
                  }
                />
              </Form.Field>

              <Form.Field
                label='Name:'
                control='input'
                value={this.state.item.name || ''}
                type='text'
                id='name'
                readOnly
                width={6}
              />

              <Form.Field
                label='Address:'
                control='input'
                value={this.state.item.address || ''}
                type='text'
                id='address'
                readOnly
                width={10}
              />
              <Form.Field
                label='Price'
                control='input'
                defaultValue={this.props.item.price || 0}
                onChange={this.handleChange}
                type='number'
                id='price'
                readOnly={this.props.type === 'delete'}
                width={2}
              />
            </Form.Group>
            <Form.TextArea
              label='Comments ( additional info )'
              defaultValue={this.props.item.comments}
              onChange={this.handleChange}
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
