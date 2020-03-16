import React from 'react';
import './clock.css';

export default class Clock extends React.Component {
  state = {
    isCountdownEnded: true,
  };

  handleInput = e => {
    let elem = e.target;
    elem.value = Math.max(0, elem.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  componentDidMount() {
    setInterval(() => {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let cs = Math.floor(date.getMilliseconds() / 10);

      this.setState({ time: this.formatTime(h, m, s, cs) });
    }, 43);
  }

  formatTime(h, m, s, cs) {
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    cs = cs < 10 ? '0' + cs : cs;
    return `${h}:${m}:${s}:${cs}`;
  }

  render() {
    return (
      <div>
        clock
        <div className='evaClockContainer'>
          <h1 className='evaClock'>{this.state.time}</h1>
          <h1 className='evaClockPlaceholder'>88:88:88:88</h1>
        </div>
      </div>
    );
  }
}
