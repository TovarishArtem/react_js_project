import React, { Component } from 'react'

export class TextCase extends Component {
	render() {
		return (
			<div className='textCase'>
				{this.props.case.title}
				<p>{this.props.case.text}</p>
			</div>
		)
	}
}

export default TextCase
