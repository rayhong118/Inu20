import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';

class SignIn extends React.Component {
  state = { modalOpen: false };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  signIn() {
    console.log('sign in action');

    this.props.signIn({ email: 'test@inu20.com', password: 'password' });
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
          size='tiny'
          open={this.state.isModalOpen}
          onClose={() => this.closeModal()}>
          <Modal.Header>Sign in</Modal.Header>
          <Modal.Content>modalContent</Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.closeModal()}>Cancel</Button>
            <Button color='blue' onClick={() => this.signIn()}>
              Sign in
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
