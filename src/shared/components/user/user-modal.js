import React from 'react';
import { connect } from 'react-redux';
import SignIn from './sign-in';
import Settings from './settings';

class User extends React.Component {
  state = {
    uid: '',
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return { uid: nextProps.auth.uid };
  }
  render() {
    if (this.state.uid) return <Settings />;
    else return <SignIn />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(User);
