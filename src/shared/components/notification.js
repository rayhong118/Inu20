/**
 * props interface
 * color
 * icon
 * icon color
 * text
 * sec
 */

import React from 'react';
import { Portal, Icon, Message, Container } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { hideNotification } from '../store/actions/notificationActions';
import './notification.css';

class Notification extends React.Component {
  state = { isOpen: false, willClose: false };

  /*showNotification = (sec) => {
    this.setState({ isOpen: true });
    setTimeout(() => this.setState({ isOpen: false }), sec * 1000);
  };*/

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    let currConfig = this.props.notificationConfig;
    let currSec = currConfig ? currConfig.sec : 0;
    let prevSec = prevProps.notificationConfig ? prevProps.notificationConfig.sec : 0;
    console.log('noti sec', currSec, 'prev sec', prevSec);
    if (currSec && currSec !== prevSec) {
      this.setState({ ...currConfig, isOpen: true });
      setTimeout(() => {
        console.log('timeout end');
        this.setState({ isOpen: false, willClose: false });
        this.props.hideNotification();
      }, currConfig.sec * 1000);
      setTimeout(() => {
        console.log('willClose');
        this.setState({ willClose: true });
      }, (currConfig.sec - 1) * 1000);
    } else if (currSec === 0 && prevSec > 0) {
      this.setState({ isOpen: false, willClose: false });
    }
  }

  render() {
    return (
      <Portal open={this.state.isOpen} onClose={() => this.props.hideNotification()}>
        <div
          className={`${
            this.state.willClose
              ? 'notification-container hide'
              : 'notification-container'
          }`}>
          <Container id='notification'>
            <Message color={this.state.iconColor}>
              <Message.Header>
                <Icon name={this.state.iconName} color={this.state.iconColor}></Icon>
                {this.state.title}
              </Message.Header>
              {this.state.text}
            </Message>
          </Container>
        </div>
      </Portal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notificationConfig: state.notification.notificationConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNotification: () => {
      dispatch(hideNotification());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
