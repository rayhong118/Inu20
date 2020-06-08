import React from 'react';
import { Modal, Button, Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, setAuthError, register } from '../../store/actions/authActions';
import firebase from 'firebase/app';
class SignIn extends React.Component {
  state = {
    isModalOpen: false,
    authError: '',
    loading: false,
    isSignIn: true,
    email: '',
    password: '',
    repPassword: '',
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    if (this.state.authError) this.props.setAuthError();
  };

  openModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: true,
      isSignIn: true,
      email: '',
      password: '',
    });
    this.props.setAuthError();

    // console.log('auth', this.props.auth);
    // console.log('user', this.props.auth.user);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, loading: false });
  };

  toggleIsSignIn = () => {
    this.setState({
      isSignIn: !this.state.isSignIn,
      email: '',
      password: '',
      repPassword: '',
    });
    this.props.setAuthError();
  };

  signIn = () => {
    this.setState({ loading: true });

    this.props.signIn({ email: this.state.email, password: this.state.password });
  };

  signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function () {})
      .catch((err) => {
        console.log(err);
      });
  };

  register = () => {
    this.setState({ loading: true });
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      repPassword: this.state.repPassword,
    });
  };

  resetPassword = () => {
    console.log('reset password', !!this.state.email);

    if (!this.state.email)
      this.props.setAuthError('Please enter your email for password reset');
    else {
      let auth = firebase.auth();
      auth
        .sendPasswordResetEmail(this.state.email)
        .then(function () {})
        .catch((err) => {
          console.log(err);
          this.props.setAuthError(err.message);
        });
    }
  };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
    } else {
      return {
        loading: false,
        authError: nextProps.authError,
      };
    }
    //return null;
  }

  render() {
    return (
      <Modal
        trigger={
          <Button secondary size='mini' onClick={this.openModal}>
            Sign in / Register
          </Button>
        }
        size='tiny'
        open={this.state.isModalOpen}
        onClose={this.closeModal}>
        <Modal.Header>{this.state.isSignIn ? 'Sign in' : 'Register'}</Modal.Header>
        <Modal.Content>
          {this.state.authError ? (
            <Message color='red'>
              <span>{this.state.authError}</span>
            </Message>
          ) : null}
          <Form>
            <Form.Input
              label='Email:'
              control='input'
              onChange={this.handleInput}
              value={this.state.email}
              type='text'
              id='email'
            />
            <Form.Input
              label='Password:'
              control='input'
              onChange={this.handleInput}
              value={this.state.password}
              type='password'
              id='password'
            />
            {this.state.isSignIn ? (
              ''
            ) : (
              <Form.Input
                label='Repeat Password:'
                control='input'
                onChange={this.handleInput}
                value={this.state.repPassword}
                type='password'
                id='repPassword'
              />
            )}
          </Form>
          <hr />
          {this.state.isSignIn
            ? `Don't have an account yet? `
            : `Already have an account? `}
          <Button size='mini' compact color='blue' onClick={this.toggleIsSignIn}>
            {this.state.isSignIn ? 'Register here' : 'Sign in here'}
          </Button>
          or{' '}
          <Button onClick={this.signInWithGoogle} size='mini' color='blue' compact>
            <Icon name='google' onClick={this.signInWithGoogle} /> Use Google account
          </Button>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.closeModal} size='mini'>
            Cancel
          </Button>

          {this.state.isSignIn ? (
            <Button size='mini' color='blue' basic onClick={this.resetPassword}>
              <b>Forgot Password?</b>
            </Button>
          ) : (
            ''
          )}

          {this.state.isSignIn ? (
            <Button
              loading={this.state.loading}
              size='mini'
              color='blue'
              onClick={this.signIn}>
              Sign in
            </Button>
          ) : (
            <Button
              loading={this.state.loading}
              size='mini'
              color='blue'
              onClick={this.register}>
              Register
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthError: (errorMessage) => dispatch(setAuthError(errorMessage)),
    signIn: (creds) => dispatch(signIn(creds)),
    register: (creds) => dispatch(register(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
