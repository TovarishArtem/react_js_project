import React from 'react'

class AddCase extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main_case: '', // ID of the selected parent task
			title: '',
			text: '',
			activeCase: '', // To visualize the selected task
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

		// Do nothing if title or text are empty
		if (!title || !text) return

		// Create a new case object
		const newCase = {
			title,
			text,
			id: Date.now(), // Use a timestamp for the unique task ID
			nesting: [], // Empty nesting for now, to be added if it's a nested task
		}
		this.props.onAdd(newCase) // Add as a new main task

		// Reset the form state after submission
		this.setState({
			title: '',
			text: '',
			activeCase: '', // Reset the active case ID
		})
	}

	render() {
		return (
			<div>
				<form ref={el => (this.myForm = el)} onSubmit={this.handleSubmit}>
					<div className='container_cases_on_top'>
						{/* {this.props.cases && this.renderCases(this.props.cases)}{' '} */}
						{/* Render tasks */}
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
