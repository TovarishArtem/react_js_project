import React, { Component } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa'

export class Case extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active_case: '1',
			isDoneCases: {},
			openMenu: false,
			isEditing: false,
			title: props.case.title,
			text: props.case.text,
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
		if (this.props.onEdit) {
			this.props.onEdit(updatedCase)
		}
		this.setState({ isEditing: false })
	}

	// Включение режима редактирования
	startEdit = () => {
		this.setState({ isEditing: true })
	}

	// Отмена редактирования
	cancelEdit = () => {
		this.setState({
			isEditing: false,
			title: this.props.case.title,
			text: this.props.case.text,
		})
	}

	// Переключение видимости вложенных задач
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

			caseItem.nesting?.forEach(subtask => {
				newIsDoneCases[subtask.id] = isMainDone
			})

			return { isDoneCases: newIsDoneCases }
		})
	}

	handleAddNesting = parentCase => {
		const { addNesting } = this.props

		// Новая подзадача
		const newNestingCase = {
			id: Date.now(), // Уникальный ID
			title: 'Новая вложенная задача', // Заголовок подзадачи
			text: 'Текст новой вложенной задачи', // Текст подзадачи
			nesting: [], // Пустой массив подзадач
		}

		// Добавляем подзадачу к родительской задаче
		if (addNesting) {
			addNesting(newNestingCase, parentCase.id) // передаем родительскую задачу (parentCase)
		} else {
			console.error('addNesting is not defined or not passed as a prop')
		}
	}

	// Рекурсивный рендер задач
	renderCases = (caseItem, level = 0) => {
		const isMainDone = this.state.isDoneCases[caseItem.id] || false

		return (
			<li key={caseItem.id}>
				<div
					className={`main_li_user ${isMainDone ? 'done' : ''}`}
					style={{ marginLeft: level * 20 }} // Для визуального сдвига вложенности
				>
					<div className='user_container'>
						<div
							className={`user ${isMainDone ? 'done' : ''}`}
							onClick={() => {
								this.setState({ active_case: caseItem.id })
								this.props.selectCase(caseItem)
							}}
						>
							<div className='span_and_p'>
								<IoIosArrowBack className='arrow' />
								<p>{caseItem.title}</p>
							</div>
							<div className='add_nesting'>
								<FaPlus onClick={() => this.handleAddNesting(caseItem)} />
							</div>

							<input
								type='checkbox'
								checked={isMainDone}
								onChange={() => this.handleCheckboxChange(caseItem.id)}
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
				{/* Рендер вложенных задач */}
				{caseItem.nesting.length > 0 && (
					<ul className={`nesting_ul ${this.state.openMenu ? 'open' : ''}`}>
						{caseItem.nesting.map(nestedCase =>
							this.renderCases(nestedCase, level + 1)
						)}
					</ul>
				)}
				{/* Кнопка добавления вложенной задачи */}
			</li>
		)
	}

	render() {
		const { case: caseItem } = this.props

		if (!caseItem) {
			return null
		}

		return (
			<div>
				<ul className='menu'>
					{/* Начинаем рекурсивный рендер с основной задачи */}
					{this.renderCases(caseItem)}
				</ul>
			</div>
		)
	}
}

export default Case
