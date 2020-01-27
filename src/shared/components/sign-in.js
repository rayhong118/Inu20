import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default class SignIn extends React.Component {
  state = { modalOpen: false };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div>
        <Modal
          trigger={
            <Button size='mini' onClick={() => this.openModal()}>
              Sign in
            </Button>
          }
          open={this.state.isModalOpen}
          onClose={() => this.closeModal()}>
          <Modal.Header>Sign in</Modal.Header>
          <Modal.Content>modalContent</Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
      </div>
    );
  }
}
