import React from 'react';
import { Container } from 'semantic-ui-react';

export default class DogheadZh extends React.Component {
  // epid: smaller value means older episode
  // will default to latest one
  state = { epid: 0 };

  componentDidMount() {
    const id = this.props.match.params.epid;
    console.log(this.props);
    this.setState({ epid: id });
  }

  goNext() {
    const curr = this.state.epid;
    if (curr) {
      this.setState({ epid: curr + 1 });
    }
  }
  goPrev() {
    const curr = this.state.epid;
    if (curr) {
      this.setState({ epid: curr - 1 });
    }
  }

  render() {
    return (
      <Container>
        <div></div>
        <br />
        <img src='https://i.imgur.com/IR42UdO.jpg' />
        <img src='https://i.imgur.com/ECa8jB6.jpg' />
      </Container>
    );
  }
}
