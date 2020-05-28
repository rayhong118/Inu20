import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

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
    return (
      <Modal
        trigger={
          <Button size='mini' onClick={this.openModal}>
            Settings
          </Button>
        }
        size='tiny'
        open={this.state.isModalOpen}
        onClose={this.closeModal}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>Your Email : {this.props.auth.email}</Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button color='red' onClick={this.signOut}>
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
