import React, { Component } from 'react';
import { render } from 'react-dom';

class JsonPlaceholder extends Component {
  state = {
    results: []
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( 'load', () => {
      this.setState({
        results: JSON.parse(xhr.responseText).map( item => {
          return ({
            //key: item.id,
            ...item
          })
        })
      });
      console.log(this.state);
    });
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();
  }

  render() {
    let table = this.state.results.map( item => {
      return(
        <tr key={item.id}>
          <td>{item.uesrId}</td>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.body}</td>
        </tr>
      )
    });

    return(
      <div>
        JsonPlaceholder table <br/>
        table length: {table.length}
        <table>
          <tbody>
            {table}
          </tbody>

        </table>
        
      </div>
    )
  }
  
}

export default JsonPlaceholder;