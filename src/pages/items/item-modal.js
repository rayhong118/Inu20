// not being used
import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react'

class ItemModal extends React.Component{
  state = {
    modalOpen: false,
    name: this.props.item.name,
    address: this.props.item.address,
    price: this.props.item.price
  }

  handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
  }
  
  openModal = () => this.setState({modalOpen: true});
  closeModal = () => this.setState({modalOpen: false});

  logData(){
    console.log(this.state)
  }

  render(){
    const itemData = this.props.item;
   
    return(
      <Modal 
        trigger={<Button color='blue' size='mini' onClick={this.openModal}> 
          <Icon name='edit'>
          </Icon>Edit
        </Button>}
        open={this.state.modalOpen}
        onClose={this.closeModal}>
      <Modal.Header>Edit restaurant info: {this.props.item.name}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
              <label>Name</label>
              <Input defaultValue={this.props.item.name} 
              onBlur={this.handleChange} type="text" id="name"/>
              </Form.Field>
              <Form.Field>
              <label>Address</label>
              <Input defaultValue={this.props.item.address} 
              onBlur={this.handleChange} type="text" id="address"/>
              </Form.Field>
              <Form.Field>
              <label>Price</label>
              <Input defaultValue={this.props.item.price} 
              onBlur={this.handleChange} type="number" id="price"/>
              </Form.Field>
          </Form.Group>

          <Button onClick={this.closeModal} negative>
            Cancel
          </Button>
          <Button primary onClick={() => this.logData()}>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
    )
  }
}

export default ItemModal;