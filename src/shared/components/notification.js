/**
 * props interface
 * color
 * icon
 * icon color
 * text
 * dismissSeconds
 */

import React from 'react';
import { Portal, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { hideNotification } from '../store/actions/notificationActions';

class Notification extends React.Component {
  state = { isOpen: false };

  showNotification = (sec) => {
    this.setState({ isOpen: true });
    setTimeout(() => this.setState({ isOpen: false }), sec * 1000);
  };

  render() {
    return (
      <Portal open={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
        <Segment
          padded
          raised
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '10',
            transform: 'translate(-50%, -50%)',
          }}>
          <Icon></Icon>
        </Segment>
      </Portal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notificationConfig: state.notificationConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNotification: () => {
      dispatch(hideNotification);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
