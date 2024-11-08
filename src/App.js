import React from 'react'
import Header from './components/Header'
import Cases from './components/Cases'
import AddCase from './components/AddCase'

class App extends React.Component {
	constructor(props) {
		super(props)
		const savedCases = localStorage.getItem('cases') // Получаем данные из localStorage
		this.state = {
			cases: savedCases
				? JSON.parse(savedCases)
				: [
						{
							id: 0,
							main_case: '',
							title: 'Помыть посуду',
							text: 'помыть для мамы посуду',
							nesting: [],
						},
				  ],
		}
		this.addUser = this.addUser.bind(this)
		this.deleteNesting = this.deleteNesting.bind(this)
		this.deleteMainCase = this.deleteMainCase.bind(this)
		this.addNesting = this.addNesting.bind(this)
		this.handleSaveEdit = this.handleSaveEdit.bind(this)
	}

	componentDidMount() {
		// Загружаем данные из localStorage при загрузке компонента
		const savedCases = localStorage.getItem('cases')
		if (savedCases) {
			this.setState({ cases: JSON.parse(savedCases) })
		}
	}

	componentDidUpdate(_, prevState) {
		// Сохраняем данные в localStorage при изменении cases
		if (prevState.cases !== this.state.cases) {
			localStorage.setItem('cases', JSON.stringify(this.state.cases))
		}
	}
	handleSaveEdit(updatedCase) {
		this.setState(prevState => ({
			cases: prevState.cases.map(caseItem =>
				caseItem.id === updatedCase.id ? updatedCase : caseItem
			),
		}))
	}

	deleteMainCase(casee) {
		const updatedCases = this.state.cases.filter(
			caseItem => caseItem.id !== casee.id
		)
		this.setState({ cases: updatedCases })
	}

	deleteNesting(mainCase, subTask) {
		console.log('deleteNesting called')
	}

	addUser(casee) {
		const newId =
			this.state.cases.length > 0
				? Math.max(...this.state.cases.map(c => c.id)) + 1
				: 1
		this.setState({ cases: [...this.state.cases, { id: newId, ...casee }] })
	}

	addNesting(casee) {
		const nestingTitle = casee.main_case
		const newId =
			Math.max(
				...this.state.cases.flatMap(item =>
					Array.isArray(item.nesting) ? item.nesting.map(n => n.id || 0) : [0]
				),
				0
			) + 1

		const updatedCases = this.state.cases.map(item => {
			if (item.title === nestingTitle) {
				const currentNesting = Array.isArray(item.nesting) ? item.nesting : []
				return {
					...item,
					nesting: [...currentNesting, { ...casee, id: newId }],
				}
			}
			return item
		})
		this.setState({ cases: updatedCases })
	}

	render() {
		return (
			<div>
				<Header title='Список пользователей' />
				<main>
					<Cases
						cases={this.state.cases}
						onEdit={this.editUser}
						onSave={this.handleSaveEdit}
						onDeleteMain={this.deleteMainCase}
						onDeleteNesting={this.deleteNesting}
					/>
				</main>

				<aside>
					<AddCase
						onAdd={this.addUser}
						cases={this.state.cases}
						addNesting={this.addNesting}
					/>
				</aside>
			</div>
		)
	}
}

export default App
