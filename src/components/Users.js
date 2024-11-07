import React from 'react'
import User from './User'
import TextCase from './TextCase'

class Users extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			elShow: {
				id: 0,
				main_case: '',
				title: 'Помыть посуду',
				text: 'помыть  для мамы посуду',
				nesting: [],
			},
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
								<User
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
					<TextCase case={this.state.elShow} />
				</div>
			)
		} else
			return (
				<div className='user'>
					<h3>Пользователей нет</h3>
				</div>
			)
	}
}

export default Users
