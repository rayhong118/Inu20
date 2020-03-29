import React from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  deleteItem,
  editItem,
  addItem,
} from '../../shared/store/actions/restaurantActions';
import { googleMapsApiKey } from '../../config/apikeys';
import Script from 'react-load-script';

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    // Declare State
    this.state = {
      item: this.props.item.name
        ? { ...this.props.item }
        : { address: '', name: '', url: '', comments: '' },
    };
  }

  handleScriptLoad = () => {
    const options = {
      types: ['establishment'],
    };
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );
    this.autocomplete.setFields([
      'address_components',
      'formatted_address',
      'name',
      'url',
    ]);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    console.log('address', address);

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        item: {
          ...this.state.item,
          address: addressObject.formatted_address,
          name: addressObject.name,
          url: addressObject.url,
        },
      });
    }
  };
  state = {
    modalOpen: false,
    item: this.props.item,
    isFormValid: false,
  };

  handleChange = e => {
    let elem = e.target;
    if (elem.id === 'price') {
      elem.value = Math.max(parseInt(elem.value), 0);
    }

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
    this.setState({
      modalOpen: false,
      item: this.props.item || { name: '', address: '', comments: '' },
    });
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

  validateForm = item => {
    const isValid = item.name && item.address && !!parseInt(item.price);
    this.setState({ isFormValid: isValid, item });
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
            {this.props.type !== 'delete' ? (
              <Form.Group>
                <Form.Field width={16} required readOnly={this.props.type === 'delete'}>
                  <label>Search Place:</label>
                  <input
                    id='autocomplete'
                    type='text'
                    placeholder='Enter a location'
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
            ) : (
              ''
            )}

            <Form.Group>
              <Form.Field
                label='Name:'
                control='input'
                value={this.state.item.name}
                type='text'
                id='name'
                readOnly
                width={6}
              />

              <Form.Field
                label='Address:'
                control='input'
                value={this.state.item.address}
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

        {this.props.type !== 'delete' ? (
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}
            onLoad={this.handleScriptLoad}
          />
        ) : (
          ''
        )}
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

/*
place interface: {
  name: string;
  address: string;
  url: string;
  comments: string (needs to be updated into {user: string, content: string}[])
  tags: string[] (proposed)
}
*/
