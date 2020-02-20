import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './doghead.css';

export default class DogheadZh extends React.Component {
  // epid: smaller value means older episode
  // will default to latest one

  data = [
    {
      url: 'https://i.imgur.com/ECa8jB6.jpg',
      date: '2020/02/19',
      title: '照片',
    },
    {
      url: 'https://i.imgur.com/vAk0eTn.jpg',
      date: '2019/12/26',
      title: 'Boxing Day',
    },
  ];
  state = { epid: 0 };

  static getDerivedStateFromProps(nextProps, prevState) {
    const id = nextProps.match.params.epid;
    console.log(id);

    return {
      epid: id,
    };
  }

  goNext = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr + 1 });
    }
    console.log(this.state.epid);
  };
  goPrev = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr - 1 });
    }
    console.log(this.state.epid);
  };

  checkEpidValidity(id) {
    if (id >= 0 && id < this.data.length) return true;
    return false;
  }

  render() {
    let id =
      parseInt(this.state.epid) === 0
        ? 0
        : parseInt(this.state.epid) || this.data.length - 1;
    let episode = this.data[id];

    let nav = (
      <div>
        <Button as={Link} color='grey' compact size='small' to='/doghead-zh/0'>
          {'|<'}
        </Button>
        <Button
          as={Link}
          color='grey'
          compact
          size='small'
          disabled={!id}
          to={`/doghead-zh/${id - 1}`}>
          {'<<'}PREV
        </Button>
        <Button
          as={Link}
          color='grey'
          compact
          size='small'
          disabled={id === this.data.length - 1}
          to={`/doghead-zh/${parseInt(id + 1)}`}>
          NEXT>>
        </Button>
        <Button as={Link} color='grey' compact size='small' to={`/doghead-zh/`}>
          {'>|'}
        </Button>
      </div>
    );
    if (this.checkEpidValidity(id) || !id)
      return (
        <Container textAlign='center'>
          <h2 className='comics-title'>{episode.title}</h2>
          {nav}

          <div className='comics'>
            <img alt='title banner' src='https://i.imgur.com/IR42UdO.jpg' />
            <img alt='main comics' src={episode.url} />
          </div>
        </Container>
      );
    else return <div>Invalid request</div>;
  }
}
