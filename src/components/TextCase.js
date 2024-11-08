import React, { Component } from 'react'

export class TextCase extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditing: false, // Режим редактирования
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

	// Сохранение изменений
	saveEdit = () => {
		const updatedCase = {
			...this.props.case,
			title: this.state.title,
			text: this.state.text,
		}
		this.props.onSave(updatedCase) // Вызываем функцию сохранения из пропсов
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

	render() {
		return (
			<div className='textCase'>
				{this.state.isEditing ? (
					<div className='container_form_edit'>
						<div className='form_text'>
							<input
								type='text'
								value={this.state.title}
								onChange={this.handleTitleChange}
							/>
							<textarea
								value={this.state.text}
								onChange={this.handleTextChange}
							/>
							<div className='container_button_save'>
								<button className='button_save_edit' onClick={this.saveEdit}>
									Сохранить
								</button>
								<button className='button_save_edit' onClick={this.cancelEdit}>
									Отмена
								</button>
							</div>
						</div>
					</div>
				) : (
					<div>
						<h3>{this.props.case.title}</h3>
						<p>{this.props.case.text}</p>
						<button className='button_edit' onClick={this.startEdit}>
							Редактировать
						</button>
					</div>
				)}
			</div>
		)
	}
}

export default TextCase
