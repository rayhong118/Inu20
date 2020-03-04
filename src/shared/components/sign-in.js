import React from 'react';
import { Modal, Button, Form, Message, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut, clearAuthError } from '../store/actions/authActions';

class SignIn extends React.Component {
  state = { isModalOpen: false, authError: '', loading: false };

  openModal = () => {
    this.setState({ ...this.state, isModalOpen: true });
    this.props.clearAuthError();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, loading: false });
  };

  signIn = () => {
    this.setState({ loading: true });
    this.props.signIn({ email: this.state.email, password: 'password' });
  };

  signOut = () => {
    this.props.signOut();
    this.closeModal();
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState);
    // new sign in
    if (!prevState.authUid) {
      // sign in success
      if (nextProps.auth.uid) {
        return {
          authUid: nextProps.auth.uid,
          isModalOpen: false,
          loading: false,
          authError: null,
        };
      } else {
        return {
          showAuthError: true,
          authError: nextProps.authError,
          loading: false,
        };
      }
    } else if (!nextProps.auth.uid) {
      return {
        authUid: null,
        isModalOpen: false,
        loading: false,
        authError: null,
      };
    }
    return null;
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid)
      return (
        <Modal
          trigger={
            <Button size='mini' onClick={this.openModal}>
              Sign in
            </Button>
          }
          size='tiny'
          open={this.state.isModalOpen}
          onClose={this.closeModal}>
          <Modal.Header>Sign in</Modal.Header>
          <Modal.Content>
            {this.state.authError ? (
              <Message color='red'>
                <span>{this.state.authError}</span>
              </Message>
            ) : null}
            <Form>
              <Form.Field
                label='Email:'
                control='input'
                onBlur={this.handleInput}
                type='text'
                id='email'
              />
              <Form.Field
                label='Password:'
                control='input'
                onBlur={this.handleInput}
                type='password'
                id='password'
                disabled
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button loading={this.state.loading} color='blue' onClick={this.signIn}>
              Sign in
            </Button>
          </Modal.Actions>
        </Modal>
      );
    else
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
          <Modal.Content></Modal.Content>
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
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearAuthError: () => dispatch(clearAuthError()),
    signIn: creds => dispatch(signIn(creds)),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
