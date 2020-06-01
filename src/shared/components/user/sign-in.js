import React from 'react';
import { Modal, Button, Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, clearAuthError, register } from '../../store/actions/authActions';
import firebase from 'firebase';
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

  openModal = () => {
    this.setState({ ...this.state, isModalOpen: true, isSignIn: true });
    this.props.clearAuthError();

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
  };

  register = () => {
    this.setState({ loading: true });
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      repPassword: this.state.repPassword,
    });
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
      .then(function (result) {
        let token = result.credential;
        let user = result.user;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState);
    let clearPasswordFields = { password: '', repPassword: '' };
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
              onBlur={this.handleInput}
              type='text'
              id='email'
            />
            <Form.Input
              label='Password:'
              control='input'
              onBlur={this.handleInput}
              type='password'
              id='password'
            />
            {this.state.isSignIn ? (
              ''
            ) : (
              <Form.Input
                label='Repeat Password:'
                control='input'
                onBlur={this.handleInput}
                type='password'
                id='repPassword'
              />
            )}
          </Form>

          <hr />
          <div>
            {this.state.isSignIn
              ? `Don't have an account yet? `
              : `Already have an account? `}
            <Button size='mini' compact secondary onClick={this.toggleIsSignIn}>
              {this.state.isSignIn ? 'Register here' : 'Sign in here'}
            </Button>
            or{' '}
            <Button onClick={this.signInWithGoogle} secondary size='mini' compact>
              <Icon name='google' onClick={this.signInWithGoogle} /> Use Google account
            </Button>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal} size='mini'>
            Cancel
          </Button>
          <Button
            loading={this.state.loading}
            color='blue'
            basic
            onClick={this.signInTestAccount}
            size='mini'>
            Sign in (Public test account)
          </Button>
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
    clearAuthError: () => dispatch(clearAuthError()),
    signIn: (creds) => dispatch(signIn(creds)),
    register: (creds) => dispatch(register(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
