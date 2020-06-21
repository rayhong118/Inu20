import React from 'react';
import firebase from 'firebase/app';
import queryString from 'query-string';
import { Container, Button, Input, Message, Icon } from 'semantic-ui-react';

export default class AccountActions extends React.Component {
  state = {
    action: '',
    email: '',
    oobCode: '',
    errorMessage: '',
    password: '',
  };

  componentDidMount() {
    let parsed = queryString.parse(this.props.location.search);
    if (!this.props.location.search)
      this.setState({ action: 'error', errorMessage: 'Invalid Account Action' });
    else if (parsed) {
      firebase
        .auth()
        .verifyPasswordResetCode(parsed.oobCode)
        .then((email) => {
          let currentUserEmail = firebase.auth().currentUser
            ? firebase.auth().currentUser.email
            : '';
          if (!currentUserEmail || currentUserEmail === email)
            this.setState({ email, action: parsed.mode, oobCode: parsed.oobCode });
          else this.setState({ errorMessage: 'User Credential Error!', action: 'error' });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ action: 'error', errorMessage: error.Message });
        });
      console.log(parsed);
    }
  }
  handleInput = (e) => {
    let elem = e.target;
    this.setState({ password: elem.value });
  };

  resetPassword = () => {
    firebase
      .auth()
      .confirmPasswordReset(this.state.oobCode, this.state.password)
      .then(function () {
        console.log('success!');
      })
      .catch((err) => {
        console.log('error');
      });
  };

  render() {
    console.log(this.props.location.search);
    switch (this.state.action) {
      case 'resetPassword':
        return (
          <Container>
            <h4>Password Reset</h4>
            <div>{this.state.errorMessage}</div>
            <div>Your email is: {this.state.email}</div>
            <form>
              <Input
                size='mini'
                type='password'
                placeholder='new password'
                onBlur={this.handleInput}
              />
              <Button size='mini' type='button' onClick={this.resetPassword}>
                reset password
              </Button>
            </form>
          </Container>
        );

      case 'emailVerification':
        return (
          <Container>
            <Message color='green'>
              <h4>
                <Icon name='check' />
                Email Verification Success
              </h4>
            </Message>
          </Container>
        );

      case 'error':
        return (
          <Container>
            <Message color='red'>
              <h4>
                <Icon name='warning' />
                {this.state.errorMessage}
              </h4>
            </Message>
          </Container>
        );

      default:
        return (
          <Container>
            <Message color='yellow'>
              <h4>
                <Icon name='circle notch' loading={true} />
                Identifying User Action ...
              </h4>
            </Message>
          </Container>
        );
    }
  }
}
