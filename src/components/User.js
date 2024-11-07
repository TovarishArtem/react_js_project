import React from 'react'
import Nesting from './Nesting'

class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active_case: '1',
			isDoneCases: {}, // Объект для отслеживания состояния каждого чекбокса
		}
	}

	handleCheckboxChange = caseId => {
		this.setState(prevState => ({
			isDoneCases: {
				...prevState.isDoneCases,
				[caseId]: !prevState.isDoneCases[caseId],
			},
		}))
	}

	handleMainCheckboxChange = () => {
		const { case: caseItem } = this.props
		this.setState(prevState => ({
			isDoneCases: {
				...prevState.isDoneCases,
				[caseItem.id]: !prevState.isDoneCases[caseItem.id],
			},
		}))
	}

	render() {
		const { case: caseItem } = this.props
		const isMainDone = this.state.isDoneCases[caseItem.id] || false

		return (
			<div>
				<ul className='menu'>
					<li>
						<div className={`main_li_user ${isMainDone ? 'done' : ''}`}>
							<div
								className={`user ${isMainDone ? 'done' : ''}`}
								onClick={() => {
									this.setState({ active_case: caseItem.id })
									this.props.forText(caseItem)
								}}
							>
								<div className='span_and_p'>
									<span className='material-symbols-outlined'>
										chevron_left
									</span>
									<p>{caseItem.title}</p>
								</div>
								<input
									type='checkbox'
									checked={isMainDone} // Управляемое состояние для главного чекбокса
									onChange={this.handleMainCheckboxChange} // Обработчик для изменения состояния
								/>
							</div>
						</div>

						<ul className='nesting_ul'>
							{this.props.cases.map(el => (
								<div key={el.id}>
									{el.nesting &&
										el.nesting.map((elem, index) => {
											if (elem.main_case === caseItem.title) {
												return (
													<p key={index}>
														<Nesting
															case={elem}
															isDone={this.state.isDoneCases[elem.id] || false}
															fun={() => this.handleCheckboxChange(elem.id)}
														/>
													</p>
												)
											}
											return null
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
