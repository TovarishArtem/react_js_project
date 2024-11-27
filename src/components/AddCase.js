import React from 'react'

class AddCase extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main_case: '',
			title: '',
			text: '',
			activeCase: '',
		}
	}

	//
	// renderCases = (cases, level = 0) => {
	// 	return cases.map(el => {
	// 		const isActive = this.state.activeCase === el.id
	// 		const isParent = level === 0

	// 		return (
	// 			<div
	// 				key={el.id}
	// 				style={{ marginLeft: level * 20 }}
	// 				className={`item_cases_on_top ${isActive ? 'active' : ''} ${
	// 					isParent ? 'parent-case' : 'nested-case'
	// 				}`}
	// 			>
	// 				{el.title}
	// 				{el.nesting && this.renderCases(el.nesting, level + 1)}{' '}
	// 				{/* Recursion */}
	// 			</div>
	// 		)
	// 	})
	// }

	handleSubmit = e => {
		e.preventDefault()
		const { main_case, title, text } = this.state

		if (!title || !text) return

		const newCase = {
			title,
			text,
			id: Date.now(),
			nesting: [],
		}
		this.props.onAdd(newCase)

		this.setState({
			title: '',
			text: '',
			activeCase: '',
		})
	}

	render() {
		return (
			<div>
				<form ref={el => (this.myForm = el)} onSubmit={this.handleSubmit}>
					<div className='container_cases_on_top'>
						{/* {this.props.cases && this.renderCases(this.props.cases)}{' '} */}
					</div>

					<input
						placeholder='Заголовок'
						value={this.state.title}
						onChange={e => this.setState({ title: e.target.value })}
					/>
					<input
						placeholder='Текст'
						value={this.state.text}
						onChange={e => this.setState({ text: e.target.value })}
					/>
					<button type='submit'>Добавить</button>
				</form>
			</div>
		)
	}
}

export default AddCase
