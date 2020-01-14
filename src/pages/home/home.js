import React, { Component } from 'react';
import './home.css'

export default class HomePage extends Component{
  displayContent(e){
    console.log('transition end');
    console.log(e.target);
    e.target.classList.toggle('hidden');
  }

  render() {

    return(
      <div className="img-container" 
      onTransitionEnd={(e)=>this.displayContent(e)} >
        <div className="img hidden">1
          <div>
            this should display when not being hovered

            this should be hidden when not being hovered
          </div>
        </div>
        <div className="img">2</div>
        <div className="img">3</div>
        <div className="img">4</div>
        <div className="img">5</div>

      </div>
    )
  }
}
