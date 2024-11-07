import React from 'react'
import Nesting from './Nesting'

class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active_case: '1',
			isDoneCases: {},
			openMenu: false, // Стейт для контроля состояния выпадающего меню
		}
	}

	toggleMenu = () => {
		this.setState(prevState => ({
			openMenu: !prevState.openMenu,
		}))
	}

	handleCheckboxChange = caseId => {
		this.setState(prevState => {
			const newIsDoneCases = {
				...prevState.isDoneCases,
				[caseId]: !prevState.isDoneCases[caseId],
			}

			// Проверяем, выделены ли все подзадачи
			const { case: caseItem } = this.props
			const allSubtasksDone = caseItem.nesting?.every(
				subtask => newIsDoneCases[subtask.id]
			)

			// Если все подзадачи выполнены, то родительская задача тоже должна быть отмечена
			if (allSubtasksDone) {
				newIsDoneCases[caseItem.id] = true
			} else {
				// Если хотя бы одна подзадача не выполнена, родительский чекбокс снимается
				newIsDoneCases[caseItem.id] = false
			}

			return { isDoneCases: newIsDoneCases }
		})
	}

	handleMainCheckboxChange = () => {
		const { case: caseItem } = this.props
		const isMainDone = !this.state.isDoneCases[caseItem.id]

		this.setState(prevState => {
			const newIsDoneCases = {
				...prevState.isDoneCases,
				[caseItem.id]: isMainDone,
			}

			// Если родительская задача выделена, все подзадачи также должны быть выделены
			if (isMainDone) {
				caseItem.nesting?.forEach(subtask => {
					newIsDoneCases[subtask.id] = true
				})
			} else {
				// Если родительская задача не выделена, все подзадачи снимаются
				caseItem.nesting?.forEach(subtask => {
					newIsDoneCases[subtask.id] = false
				})
			}

			return { isDoneCases: newIsDoneCases }
		})
	}

	render() {
		const { case: caseItem } = this.props
		const isMainDone = this.state.isDoneCases[caseItem.id] || false

		return (
			<div>
				<ul className='menu'>
					<li onClick={this.toggleMenu}>
						<div className={`main_li_user ${isMainDone ? 'done' : ''}`}>
							<div className='user_container'>
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
										checked={isMainDone}
										onChange={this.handleMainCheckboxChange}
									/>
									<span
										onClick={() => this.props.onDeleteMain(caseItem)}
										className='delete_icon'
									>
										x
									</span>
								</div>
							</div>
						</div>

						<ul className={`nesting_ul ${this.state.openMenu ? 'open' : ''}`}>
							{this.props.cases.map(el => (
								<div key={el.id}>
									{el.nesting &&
										el.nesting.map((elem, index) => {
											if (elem.main_case === caseItem.title) {
												return (
													<p key={index}>
														<Nesting
															onDeleteNesting={this.props.onDeleteNesting}
															forText={this.props.forText}
															case={elem}
															main_case={caseItem}
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
