import React from 'react';
import firebase from 'firebase';
import queryString from 'query-string';

export default class PasswordReset extends React.Component {
  state = {
    email: '',
    oobCode: '',
    errorMessage: '',
    password: '',
  };

  componentDidMount() {
    let parsed = queryString.parse(this.props.location.search);

    firebase
      .auth()
      .verifyPasswordResetCode(parsed.oobCode)
      .then((email) => {
        this.setState({ email, oobCode: parsed.oobCode });
      })
      .catch(() => {
        this.setState({ errorMessage: 'invalid password reset code' });
      });
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
    return (
      <div>
        {this.state.email}
        {this.state.errorMessage}

        <input placeholder='new password' onBlur={this.handleInput} />
        <button onClick={this.resetPassword}>reset password</button>
      </div>
    );
  }
}
