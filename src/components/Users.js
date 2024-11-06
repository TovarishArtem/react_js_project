import React from 'react'
import User from './User'
import TextCase from './TextCase'

let target
class Users extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			elShow: '',
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
									cases={this.props.cases}
									forText={this.forTextMethod}
									onEdit={this.props.onEdit}
									onDelete={this.props.onDelete}
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
