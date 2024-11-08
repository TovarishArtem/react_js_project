import React from 'react'
import Case from './Case'
import TextCase from './TextCase'

class Cases extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			elShow: {},
		}
		this.forTextMethod = this.forTextMethod.bind(this)
	}
	forTextMethod(e) {
		this.setState({ elShow: e })
		// console.log(target)
	}
	render() {
		if (this.props.cases.length > 0) {
			return (
				<div className='container_case_textCase'>
					<div className='container_users'>
						{this.props.cases.map(el => (
							<p>
								<Case
									onDeleteMain={this.props.onDeleteMain}
									onDeleteNesting={this.props.onDeleteNesting}
									cases={this.props.cases}
									forText={this.forTextMethod}
									key={el.id}
									case={el}
								/>
							</p>
						))}
					</div>
					<TextCase onSave={this.props.onSave} case={this.state.elShow} />
				</div>
			)
		} else
			return (
				<div className='user'>
					<h3>Нет задач</h3>
				</div>
			)
	}
}

export default Cases
