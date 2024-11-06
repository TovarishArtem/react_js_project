import React from 'react'

import Nesting from './Nesting'

class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editForm: false,
			active_case: '1',
		}
	}

	render() {
		return (
			<div>
				<ul className='menu'>
					<li>
						<div
							className='user'
							onClick={() => {
								this.setState({ active_case: this.props.case.id })
								this.props.forText(this.props.case)
							}}
						>
							{/* onChange={(e) => this.setState({isHappy: e.target.value}) } */}

							<p>{this.props.case.title}</p>
							<input type='checkbox' id='isDone' />

							{/* {this.state.editForm && (
								<AddUser user={this.user} onAdd={this.props.onEdit} />
							)} */}
						</div>
						<ul>
							{this.props.cases.map(el => (
								<div>
									{el.nesting &&
										el.nesting.map((elem, index) => {
											console.log(elem.main_case, this.props.case.title)
											// Проверяем условие и возвращаем <Nesting />, если оно выполняется
											if (elem.main_case === this.props.case.title) {
												return (
													<p key={index}>
														<Nesting case={elem} />
													</p>
												)
											}
											return null // Возвращаем null, если условие не выполняется
										})}
								</div>
							))}
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default User
