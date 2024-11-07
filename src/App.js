import React from 'react'
import Header from './components/Header'
import Users from './components/Users'
import AddUser from './components/AddUser'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cases: [
				{
					id: 0,
					main_case: '',
					title: 'Помыть посуду',
					text: 'помыть  для мамы посуду',
					nesting: [],
				},
			],
		}
		this.addUser = this.addUser.bind(this)
		this.deleteNesting = this.deleteNesting.bind(this)
		this.deleteMainCase = this.deleteMainCase.bind(this)
		this.addNesting = this.addNesting.bind(this)
	}
	render() {
		return (
			<div>
				<Header title='Список пользователей' />
				<main>
					<Users
						cases={this.state.cases}
						onEdit={this.editUser}
						onDeleteMain={this.deleteMainCase}
						onDeleteNesting={this.deleteNesting}
					/>
				</main>

				<aside>
					<AddUser
						onAdd={this.addUser}
						cases={this.state.cases}
						addNesting={this.addNesting}
					/>
				</aside>
			</div>
		)
	}
	deleteMainCase(casee) {
		const updatedCases = this.state.cases.filter(
			caseItem => caseItem.id !== casee.id
		)
		this.setState({ cases: updatedCases }) // Используем this.setState для обновления состояния
	}

	deleteNesting(mainCase, subTask) {
		const updatedCases = this.state.cases.map(caseItem => {
			if (caseItem.id === mainCase.id && caseItem.nesting) {
				return {
					...caseItem,
					nesting: caseItem.nesting.filter(
						subtask => subtask.id !== subTask.id
					),
				}
			}
			return caseItem
		})
		this.setState({ cases: updatedCases })
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

		// Создаем уникальный id для добавляемого элемента
		const newId =
			Math.max(
				...this.state.cases.flatMap(item =>
					Array.isArray(item.nesting) ? item.nesting.map(n => n.id || 0) : [0]
				),
				0
			) + 1

		// Обновляем массив cases, добавляя casee в nesting нужного объекта
		const updatedCases = this.state.cases.map(item => {
			if (item.title === nestingTitle) {
				// Проверяем, что nesting существует и является массивом
				const currentNesting = Array.isArray(item.nesting) ? item.nesting : []

				return {
					...item,
					nesting: [...currentNesting, { ...casee, id: newId }],
				}
			}
			return item
		})

		// Обновляем состояние
		this.setState({ cases: updatedCases })
	}
}
export default App
