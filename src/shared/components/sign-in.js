import React from 'react';
import { Modal, Button, Input, Form } from 'semantic-ui-react';
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
    console.log('sign in action', this.state.email, this.state.password);

    //this.props.signIn({ email: 'test@inu20.com', password: 'password' });
  }

  handleInput = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

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
          <Modal.Content>
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
              />
            </Form>
          </Modal.Content>
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
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
