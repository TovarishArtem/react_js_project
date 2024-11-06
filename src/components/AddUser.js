import React from 'react'

class AddUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main_case: '',
			title: '',
			text: '',
		}
		this.handleCaseClick = this.handleCaseClick.bind(this)
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
									className='item_cases_on_top'
								>
									{el.title}
								</div>
							))}
					</div>
					<input
						type='checkbox'
						id='isNesting'
						onChange={e => this.setState({ main_case: '' })}
					/>
					<input
						placeholder='Заголовок'
						onChange={e => this.setState({ title: e.target.value })}
					/>
					<input
						placeholder='Текст'
						onChange={e => this.setState({ text: e.target.value })}
					/>
					{console.log(this.state.main_case)}
					<button
						type='button'
						onClick={() => {
							this.myForm.reset()

							const newUser = {
								main_case: this.state.main_case,
								title: this.state.title,
								text: this.state.text,
								id: Date.now(), // Генерируем уникальный id для пользователя
							}

							console.log(this.state.main_case, 'add user')
							if (this.state.main_case !== '') {
								this.props.addNesting(newUser) // Передаем только newUser
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

	handleCaseClick(el) {
		this.setState({
			main_case: el,
		})
	}
}

export default AddUser
