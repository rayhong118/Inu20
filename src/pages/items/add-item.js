import React, { Component } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';

class AddItem extends Component{
	state = {
		name: null,
		address: null,
		price: null
	}
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addItem(this.state);
	}

	render() {
		
		return(
			
			<Form onSubmit={this.handleSubmit}>
				<Form.Group widths='equal'>
					<Form.Field>
					<label>Name</label>
					<Input placeholder='Name' type="text" id="name" onChange={this.handleChange}/>
					</Form.Field>
					<Form.Field>
					<label>Address</label>
					<Input placeholder='Address' type="text" id="address" onChange={this.handleChange}/>
					</Form.Field>
					<Form.Field>
					<label>Price</label>
					<Input placeholder='price' type="number" id="price" onChange={this.handleChange}/>
					</Form.Field>
        </Form.Group>
        
				<Button primary>Submit</Button>
			</Form>
			
		)
	}
}

export default AddItem;