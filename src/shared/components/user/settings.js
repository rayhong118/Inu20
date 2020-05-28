import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import firebase from 'firebase';

class Settings extends React.Component {
  state = { isModalOpen: false };

  openModal = () => {
    console.log(this.props);
    this.setState({ ...this.state, isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false, loading: false });
  };
  signOut = () => {
    this.props.signOut();
    this.closeModal();
  };

  render() {
    const user = firebase.auth().currentUser;
    return (
      <Modal
        trigger={
          <Button secondary size='mini' onClick={this.openModal}>
            Settings
          </Button>
        }
        size='tiny'
        open={this.state.isModalOpen}
        onClose={this.closeModal}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <div>Your Email : {user.email}</div>
          <div>Email Verified: {user.emailVerified.toString()}</div>
        </Modal.Content>
        <Modal.Actions>
          <Button size='mini' onClick={this.closeModal}>
            Cancel
          </Button>
          <Button size='mini' color='red' onClick={this.signOut}>
            Sign out
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
