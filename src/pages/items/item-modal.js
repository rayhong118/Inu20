// not being used
import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react'

const ItemModal = ({ type, item }) => {
  return (
    <Modal trigger={
      <Button color='blue' size='mini'> 
        <Icon name='edit'>
        </Icon>Edit
      </Button>
      }>
    <Modal.Header>Edit restaurant info</Modal.Header>
      <Modal.Content>
      <Form>

        <Button primary>Submit</Button>
        </Form>
    </Modal.Content>
    </Modal>
  );
 
}

export default ItemModal;