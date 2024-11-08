import React from 'react'
import Nesting from './Nesting'
import { IoIosArrowBack } from 'react-icons/io'

class Case extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active_case: '1',
			isDoneCases: {},
			openMenu: false, // Стейт для контроля состояния выпадающего меню
			isEditing: false, // Режим редактирования задачи
			title: props.case.title, // Поле для редактирования заголовка
			text: props.case.text, // Поле для редактирования текста
		}
	}

	// Обработка изменений заголовка
	handleTitleChange = e => {
		this.setState({ title: e.target.value })
	}

	// Обработка изменений текста
	handleTextChange = e => {
		this.setState({ text: e.target.value })
	}

	// Сохранение отредактированных данных
	saveEdit = () => {
		const updatedCase = {
			...this.props.case,
			title: this.state.title,
			text: this.state.text,
		}
		// Предположим, что родительский компонент передает функцию saveEdit через пропсы
		if (this.props.saveEdit) {
			this.props.saveEdit(updatedCase)
		}
		this.setState({ isEditing: false }) // Выход из режима редактирования
	}

	// Включение режима редактирования
	startEdit = () => {
		this.setState({ isEditing: true })
	}

	// Отмена редактирования
	cancelEdit = () => {
		this.setState({
			isEditing: false,
			title: this.props.case.title, // Возвращаем исходные данные
			text: this.props.case.text,
		})
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

			const { case: caseItem } = this.props
			const allSubtasksDone = caseItem.nesting?.every(
				subtask => newIsDoneCases[subtask.id]
			)

			if (allSubtasksDone) {
				newIsDoneCases[caseItem.id] = true
			} else {
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

			if (isMainDone) {
				caseItem.nesting?.forEach(subtask => {
					newIsDoneCases[subtask.id] = true
				})
			} else {
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
										<IoIosArrowBack className='arrow' />

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

export default Case
