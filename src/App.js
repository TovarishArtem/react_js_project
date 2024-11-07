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
		this.deleteUser = this.deleteUser.bind(this)
		this.editUser = this.editUser.bind(this)
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
						onDelete={this.deleteUser}
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
	editUser(casee) {
		let allCases = this.state.cases
		allCases[casee.id - 1] = casee

		this.setState({ cases: [] }, () => {
			this.setState({
				users: [...allCases],
			})
		})
	}

	deleteUser(id) {
		this.setState({
			users: this.state.users.filter(el => el.id !== id),
		})
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
