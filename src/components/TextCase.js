import React, { Component } from 'react'

export class TextCase extends Component {
	render() {
		return <div className='textCase'>{this.props.case.text}</div>
	}
}

export default TextCase
