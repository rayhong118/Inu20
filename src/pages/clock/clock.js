import React from 'react';

export default class Clock extends React.Component {
  state = {
    isCountdownEnded: true,
  };

  handleInput = (e) => {
    let elem = e.target;
    elem.value = Math.max(0, elem.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    return <div>countdown</div>;
  }
}
