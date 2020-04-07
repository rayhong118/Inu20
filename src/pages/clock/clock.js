import React from 'react';
import './clock.css';

export default class Clock extends React.Component {
  timeUpdateInterval;

  state = {
    isCountdownEnded: true,
    thenTime: null,
  };

  handleInput = (e) => {
    let elem = e.target;
    elem.value = Math.max(0, parseInt(elem.value) || 0);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  componentDidMount() {
    this.enterClockMode();
  }

  enterClockMode = () => {
    this.timeUpdateInterval = setInterval(() => {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let cs = Math.floor(date.getMilliseconds() / 10);

      this.setState({ time: this.formatTime(h, m, s, cs) });
    }, 43);
  };

  enterCountdownMode = () => {
    clearInterval(this.timeUpdateInterval);
    console.log(this.state);
    const now = Date.now();
    const min = this.state.min || 0;
    const sec = this.state.sec || 0;
    const then = now + (min * 60 + sec) * 1000;
    console.log(now, then);
    const countdownInterval = setInterval(() => {
      const timeLeft = then - Date.now();
      const cs = Math.floor((timeLeft % 1000) / 10);
      const s = Math.floor(timeLeft / 1000);
      const m = Math.floor(timeLeft / 1000 / 60);
      const h = Math.floor(timeLeft / 1000 / 60 / 60);

      this.setState({ time: this.formatTime(h, m, s, cs) });
      if (timeLeft < 0) {
        clearInterval(countdownInterval);
        this.setState({ time: this.formatTime(0, 0, 0, 0) });
        return;
      }
    }, 43);
  };

  componentWillUnmount() {
    clearInterval(this.timeUpdateInterval);
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

        <input id='min' className='eva-input' onChange={this.handleInput} />
        <label className='eva-label'>
          <div>分</div>
          <div>MIN</div>
        </label>
        <input id='sec' className='eva-input' onChange={this.handleInput} />
        <label className='eva-label'>
          <div>秒</div>
          <div>SEC</div>
        </label>

        <button className='eva-button' onClick={this.enterCountdownMode}>
          <span>countdown</span>
          <span>倒計時</span>
        </button>

        <button className='eva-button' onClick={this.enterClockMode}>
          clock
        </button>
      </div>
    );
  }
}
