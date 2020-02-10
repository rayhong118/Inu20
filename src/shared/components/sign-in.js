import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../store/actions/authActions';

class SignIn extends React.Component {
  state = { modalOpen: false };

  openModal() {
    console.log(this.props.auth);
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  signIn = () => {
    this.props.signIn({ email: this.state.email, password: 'password' });
  };

  signOut = () => {
    console.log('signout');
    this.props.signOut();
    this.closeModal();
  };

  handleInput = e => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.auth.uid) this.closeModal();
  }

  render() {
    const { auth, authError } = this.props;
    if (!auth.uid)
      return (
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
          <Modal.Content>
            {authError ? <span>{authError}</span> : null}
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
            <Button onClick={() => this.closeModal()}>Cancel</Button>
            <Button color='blue' onClick={this.signIn}>
              Sign in
            </Button>
          </Modal.Actions>
        </Modal>
      );
    else
      return (
        <Modal
          trigger={
            <Button size='mini' onClick={() => this.openModal()}>
              Settings
            </Button>
          }
          size='tiny'
          open={this.state.isModalOpen}
          onClose={() => this.closeModal()}>
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content></Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.closeModal()}>Cancel</Button>
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
    signIn: creds => dispatch(signIn(creds)),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
