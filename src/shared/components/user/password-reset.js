import React from 'react';
import firebase from 'firebase';

export default class PasswordReset extends React.Component {
  state = {};

  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
        <hr />
      </div>
    );
  }
}
