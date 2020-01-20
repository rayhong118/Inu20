import React, { Component } from 'react';
import './home.css'

export default class HomePage extends Component{
  // on transition end, 
  // on mouse out, add hidde class to content

  state = {
    isMouseIn: false
  }

  displayContent(e){
    //this.setState({isMouseIn: false});
    console.log('transition end');
    console.log(e.target);

    if (this.state.isMouseIn){
      e.target.classList.add('display');
    }
  }

  mouseLeave(e){
    console.log('mouse leave',e.target);
    this.setState({isMouseIn: false})
    e.target.classList.remove('display');
  }

  mouseEnter(e){
    this.setState({isMouseIn: true});
    console.log('mouse enter',e.target);
  }
 
  render() {

    return(
      <div>
        <div className="img-container" 
        
         >
          <div className="img"
          onPointerLeave={(e)=>this.mouseLeave(e)}
          onPointerEnter={(e)=>this.mouseEnter(e)}
          onTransitionEnd={(e)=>this.displayContent(e)}>
            <div><h4>Title 1</h4></div>
            <div className='textbox'>
              this should be hidden when not being hovered
            </div>
          </div>
          <div className="img"
          onPointerLeave={(e)=>this.mouseLeave(e)}
          onPointerEnter={(e)=>this.mouseEnter(e)}
          onTransitionEnd={(e)=>this.displayContent(e)}>
            <div><h4>Title 2</h4></div>
            <div className='textbox'>
              this should be hidden when not being hovered
            </div></div>
          <div className="img">3</div>
          <div className="img">4</div>
          <div className="img">5</div>

        </div>

        <p>this is test text</p>
      </div>
      
    )
  }
}
