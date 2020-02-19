import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './doghead.css';

export default class DogheadZh extends React.Component {
  // epid: smaller value means older episode
  // will default to latest one
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

  data = [
    {
      url: 'https://i.imgur.com/ECa8jB6.jpg',
      date: '2020/02/19',
      title: '女朋友的照片',
    },
    {
      url: 'https://i.imgur.com/vAk0eTn.jpg',
      date: '2019/12/26',
      title: 'Boxing Day',
    },
  ];

  checkEpidValidity(id) {
    if (id >= 0 && id < this.data.length) return true;
    return false;
  }

  render() {
    let episode = this.data[this.state.epid];
    let id = this.state.epid;
    if (this.checkEpidValidity(this.state.epid))
      return (
        <Container textAlign='center'>
          <h2 className='comics-title'>{episode.title}</h2>
          <Button as={Link} color='grey' compact size='small' to='/doghead-zh/0'>
            {'|<'}
          </Button>
          <Button
            as={Link}
            color='grey'
            compact
            size='small'
            disabled={id == 0}
            to={`/doghead-zh/${id - 1}`}>
            {'<<'}PREV
          </Button>
          <Button
            as={Link}
            color='grey'
            compact
            size='small'
            disabled={id == this.data.length - 1}
            to={`/doghead-zh/${parseInt(id + 1)}`}>
            NEXT>>
          </Button>
          <Button
            as={Link}
            color='grey'
            compact
            size='small'
            to={`/doghead-zh/${this.data.length - 1}`}>
            {'>|'}
          </Button>

          <div className='comics'>
            <img src='https://i.imgur.com/IR42UdO.jpg' />
            <img src={episode.url} />
          </div>
        </Container>
      );
    else return <div>Invalid request</div>;
  }
}
