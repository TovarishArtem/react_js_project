import React, { Component } from 'react'

export class TextCase extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditing: false, // Editing mode flag
			title: props.case.title, // Editing the title
			text: props.case.text, // Editing the text
		}
	}

	// Обновляем состояние, если props изменились
	componentDidUpdate(prevProps) {
		if (
			prevProps.case.title !== this.props.case.title ||
			prevProps.case.text !== this.props.case.text
		) {
			this.setState({
				title: this.props.case.title,
				text: this.props.case.text,
			})
		}
	}

	// Handle title change
	handleTitleChange = e => {
		this.setState({ title: e.target.value })
	}

	// Handle text change
	handleTextChange = e => {
		this.setState({ text: e.target.value })
	}

	// Save the updated case
	saveEdit = () => {
		const updatedFields = {
			title: this.state.title,
			text: this.state.text,
		}
		this.props.onEdit(this.props.case.id, updatedFields) // Передаем ID и измененные поля
		this.setState({ isEditing: false }) // Выходим из режима редактирования
	}

	// Start editing the case
	startEdit = () => {
		this.setState({ isEditing: true })
	}

	// Cancel editing the case
	cancelEdit = () => {
		this.setState({
			isEditing: false,
			title: this.props.case.title, // Revert to original title
			text: this.props.case.text, // Revert to original text
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
