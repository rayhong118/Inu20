import React, { Component } from 'react';
import './about.css';

class AboutPage extends Component{
	render() {
		
		return(
			<div className="main-container">
        <div className="section parallax" id="section-1">
          this is test text
        </div>

        <div className="section static">
          static section
        </div>

        <div className="section parallax" id="section-2">
          this is test text
        </div>

        <div className="section static">
          static section
        </div>

      </div>
		)
	}
}

export default AboutPage;