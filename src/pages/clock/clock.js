import React from 'react';
import './clock.css';

export default class Clock extends React.Component {
  timeUpdate;
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
    this.timeUpdate = setInterval(() => {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let cs = Math.floor(date.getMilliseconds() / 10);

      this.setState({ time: this.formatTime(h, m, s, cs) });
    }, 43);
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdate);
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
      <div className='evaClockContainer'>
        <div className='clockStatusSelect'>
          <div className='clockStatusTitle'></div>
          <h4 className='clockStatusContent'>測試</h4>
        </div>

        <div className='clockStatusSelect'>
          <div className='clockStatusTitle'></div>
          <h4 className='clockStatusContent'>計時</h4>
        </div>

        <div>
          <h1 className='evaClockPlaceholder'>88:88:88:88</h1>
          <h1 className='evaClock'>{this.state.time}</h1>
        </div>

        <input className='eva-input' />
        <label className='eva-label'>
          <div>分</div>
          <div>MIN</div>
        </label>
        <input className='eva-input' />
        <label className='eva-label'>
          <div>秒</div>
          <div>SEC</div>
        </label>

        <button className='eva-button'>
          <span>countdown</span>
          <span>倒計時</span>
        </button>
      </div>
    );
  }
}
