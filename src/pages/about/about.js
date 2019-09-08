import React, { Component } from 'react';
import './about.css';

class AboutPage extends Component{
	render() {
		
		return(
			<div class="main-container">
        <div class="section parallax" id="section-1">
          this is test text
        </div>

        <div class="section static">
          static section
        </div>

        <div class="section parallax" id="section-2">
          this is test text
        </div>

        <div class="section static">
          static section
        </div>

      </div>
		)
	}
}

export default AboutPage;