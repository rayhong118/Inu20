// not being used
import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react'

const ItemModal = ({ type, item }) => {
 const modal = (
  <div>
   <Modal.Header>Edit restaurant info</Modal.Header>
   <Modal.Content>
   <Form >
    <Form.Group widths='equal'>

    </Form.Group>

    <Button primary>Submit</Button>
    </Form>
   </Modal.Content>
  </div>
 );
 
}

export default ItemModal;