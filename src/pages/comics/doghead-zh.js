import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './doghead.css';

export default class DogheadZh extends React.Component {
  // epid: smaller value means older episode
  // will default to latest one

  data = [
    {
      series: '',
      url: 'https://i.imgur.com/rYbpUdn.jpg',
      date: '2017/04/28',
      title: '恶犬狗头',
    },
    {
      series: '',
      url: 'https://i.imgur.com/Mv5JH3o.jpg',
      date: '2017/04/29',
      title: '生活如扫雷',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/gjv4ev5.jpg',
      date: '2017/07/09',
      title: '狗标',
    },
    {
      series: '',
      url: 'https://i.imgur.com/7eYhURy.jpg',
      date: '2017/08/29',
      title: '让雇主找到你',
    },
    {
      series: '',
      url: 'https://i.imgur.com/erFVgHK.jpg',
      date: '2017/08/30',
      title: '老干部',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/Y7wsN4C.jpg',
      date: '2017/09/10',
      title: '不算什么',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/KN7BsTE.jpg',
      date: '2017/10/01',
      title: '辐射',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/10ymqqL.jpg',
      date: '2017/10/17',
      title: '反应慢',
    },
    {
      series: '',
      url: 'https://i.imgur.com/wfclk9j.jpg',
      date: '2017/10/20',
      title: 'Fruit punch',
    },
    {
      series: '',
      url: 'https://i.imgur.com/KYiJvSS.jpg',
      date: '2017/10/21',
      title: '闻',
    },
    {
      series: '',
      url: 'https://i.imgur.com/Dkp6M6P.jpg',
      date: '2017/10/25',
      title: '好大份',
    },
    {
      series: '',
      url: 'https://i.imgur.com/nMQ85R2.jpg',
      date: '2017/11/10',
      title: '另一个世界',
    },
    {
      series: '',
      url: 'https://i.imgur.com/GgtGrTH.jpg',
      date: '2017/11/12',
      title: '梦里脱单',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/6qf5aVr.jpg',
      date: '2017/11/13',
      title: '吃线',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/CO9SQYj.jpg',
      date: '2017/12/13',
      title: '咸湿',
    },
    {
      series: '',
      url: 'https://i.imgur.com/SRUYFvE.jpg',
      date: '2018/01/16',
      title: '鸟',
    },
    {
      series: '',
      url: 'https://i.imgur.com/G7MNX1k.jpg',
      date: '2018/01/25',
      title: '刀来枪往',
    },
    {
      series: '',
      url: 'https://i.imgur.com/eX0XEuL.jpg',
      date: '2018/03/15',
      title: '晚上干活',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/5jcoYH9.jpg',
      date: '2018/04/12',
      title: '狗bee',
    },
    {
      series: '',
      url: 'https://i.imgur.com/RTMSvdU.jpg',
      date: '2018/04/13',
      title: '红灯',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/RzZIhip.jpg',
      date: '2018/05/09',
      title: '恶语',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/eEFj3Sj.jpg',
      date: '2019/01/07',
      title: '累成狗',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/6477pUp.jpg',
      date: '2019/06/02',
      title: '问题',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/3qJnfVM.jpg',
      date: '2019/06/15',
      title: '气',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/ldWUhP1.jpg',
      date: '2019/06/29',
      title: '胡萝卜加大棒',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/0S6CEuh.jpg',
      date: '2019/07/10',
      title: '狗行千里',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/4pfOfjZ.jpg',
      date: '2019/07/20',
      title: '猫',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/d3fv1qn.jpg',
      date: '2019/07/28',
      title: '擦桌子',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/oKZftYJ.jpg',
      date: '2019/08/05',
      title: '看不见',
    },
    {
      series: '',
      url: 'https://i.imgur.com/TZQnQio.jpg',
      date: '2019/08/06',
      title: '当生活给我柠檬',
    },
    {
      series: '',
      url: 'https://i.imgur.com/d5QQEXU.jpg',
      date: '2019/08/20',
      title: '头油炒菜',
    },

    {
      series: 'dnd',
      url: 'https://i.imgur.com/AsxoD3b.jpg',
      date: '2019/11/31',
      title: '羡慕',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/Pr71noN.jpg',
      date: '2019/12/26',
      title: 'Boxing Day',
    },
    {
      series: 'dnd',
      url: 'https://i.imgur.com/rnw9NRr.jpg',
      date: '2020/02/19',
      title: '照片',
    },
  ];
  state = { epid: 0 };

  static getDerivedStateFromProps(nextProps, prevState) {
    const id = nextProps.match.params.epid;

    // window.scrollTo(0, 0);

    return {
      epid: id,
    };
  }

  goNext = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr + 1 });
    }
    //console.log(this.state.epid);
  };
  goPrev = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr - 1 });
    }

    //console.log(this.state.epid);
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
          NEXT{'>>'}
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
            {episode.series === 'dnd' ? (
              <img alt='title banner' src='https://i.imgur.com/IR42UdO.jpg' />
            ) : (
              ''
            )}
            <img alt='main comics' src={episode.url} />
          </div>
          {nav}
        </Container>
      );
    else return <div>Invalid request</div>;
  }
}
