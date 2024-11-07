import React from 'react'

class AddUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main_case: '',
			title: '',
			text: '',
			activeCase: '', // Состояние для отслеживания активной кнопки
		}
		this.handleCaseClick = this.handleCaseClick.bind(this)
	}

	handleCaseClick(el) {
		this.setState({
			main_case: el,
			activeCase: el, // Устанавливаем активную кнопку
		})
	}

	handleCheckboxChange = () => {
		this.setState(prevState => ({
			main_case: '', // Сбрасываем main_case, если это основная задача
			activeCase: '', // Сбрасываем активную кнопку
		}))
	}

	render() {
		return (
			<div>
				<form ref={el => (this.myForm = el)}>
					<div className='container_cases_on_top'>
						{this.props.cases &&
							this.props.cases.map(el => (
								<div
									key={el.title}
									onClick={() => this.handleCaseClick(el.title)}
									className={`item_cases_on_top ${
										this.state.activeCase === el.title ? 'active' : ''
									}`} // Применяем класс active при совпадении
								>
									{el.title}
								</div>
							))}
					</div>
					<input
						type='checkbox'
						id='isNesting'
						onChange={this.handleCheckboxChange} // Используем новый обработчик
					/>
					Основная задача
					<input
						placeholder='Заголовок'
						onChange={e => this.setState({ title: e.target.value })}
					/>
					<input
						placeholder='Текст'
						onChange={e => this.setState({ text: e.target.value })}
					/>
					<button
						type='button'
						onClick={() => {
							this.myForm.reset()

							const newUser = {
								main_case: this.state.main_case,
								title: this.state.title,
								text: this.state.text,
								id: Date.now(),
							}

							if (this.state.main_case !== '') {
								this.props.addNesting(newUser)
							} else {
								this.props.onAdd(newUser)
							}
						}}
					>
						Добавить
					</button>
				</form>
			</div>
		)
	}
}

export default AddUser
