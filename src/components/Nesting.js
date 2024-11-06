import React, { Component } from 'react'

export class Nesting extends Component {
	render() {
		return (
			<>
				{console.log(123)}
				<li>{this.props.case.text}</li>
			</>
		)
	}
}

export default Nesting
