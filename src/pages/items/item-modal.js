// not being used
import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react'

class ItemModal extends React.Component{
  state = {
    modalOpen: false,
    modalType: this.props.type,
    name: this.props.item.name,
    address: this.props.item.address,
    price: this.props.item.price,
  }

  handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
  }
  
  openModal = () => this.setState({modalOpen: true});
  closeModal(){
    this.setState({modalOpen: false});
  } 

  logData(){
    console.log(this.state)
  }

  editData(){
    //this.logData();
    this.closeModal();
  }

  deleteData(){
    //this.logData();
    this.closeModal();
  }

  render(){
    const itemData = this.props.item;
    let action = {
      edit: {title:'Edit', color:'blue'},
      delete: {title:'Delete', color:'red'},
      add: {title:'Add', color:'green'}
    }

    let actionButton;

    if(this.props.type === 'add'){
      actionButton = <Button color={action.add.color} onClick={() => this.editData()} >Add</Button>
    } else if (this.props.type === 'delete'){
      actionButton = <Button color={action.delete.color} onClick={() => this.editData()} >Delete</Button>
    } else if (this.props.type === 'edit'){
      actionButton = <Button color={action.edit.color} onClick={() => this.editData()} >Edit</Button>
    }
   
    return(
      <Modal 
        trigger={<Button color={action[this.state.modalType].color} size='mini' onClick={this.openModal}> 
          <Icon name={this.state.modalType}>
          </Icon>{action[this.state.modalType].title}
        </Button>}
        open={this.state.modalOpen}
        onClose={() => {this.closeModal()}}>
      <Modal.Header>{action[this.props.type].title} restaurant: {this.props.item.name}</Modal.Header>
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
          {actionButton}
          <Button onClick={() => this.closeModal()} >Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
    )
  }
}

export default ItemModal;