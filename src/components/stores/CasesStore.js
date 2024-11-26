import { makeAutoObservable } from 'mobx'

export class CasesStore {
	cases = []
	state = {
		elShow: {}, // Состояние для отображения выбранной задачи
	}

	constructor() {
		makeAutoObservable(this)
		this.loadCases()
		this.forTextMethod = this.forTextMethod.bind(this)
	}

	// Загрузка данных из LocalStorage
	loadCases = () => {
		const savedCases = localStorage.getItem('cases')
		this.cases = savedCases
			? JSON.parse(savedCases)
			: [
					{
						id: 0,
						main_case: '',
						title: 'Помыть посуду',
						text: 'помыть для мамы посуду',
						nesting: [],
					},
			  ]
	}

	// Сохранение данных в LocalStorage
	saveCases = () => {
		localStorage.setItem('cases', JSON.stringify(this.cases))
	}

	// Установка выбранной задачи для отображения
	forTextMethod(e) {
		this.state.elShow = e
	}

	// Генерация нового ID для задачи
	generateId = () => {
		return (
			Math.max(
				0,
				...this.cases.flatMap(task => [
					task.id,
					...(task.nesting ? this.collectNestedIds(task.nesting) : []),
				])
			) + 1
		)
	}

	// Рекурсивный сбор всех ID из вложенных задач
	collectNestedIds = nesting => {
		return nesting.flatMap(task => [
			task.id,
			...(task.nesting ? this.collectNestedIds(task.nesting) : []),
		])
	}

	// Добавление новой основной задачи
	addMainCase = newCase => {
		const newId = this.generateId()
		const newMainCase = { ...newCase, id: newId, nesting: [], isDone: false }
		this.cases.push(newMainCase)
		this.saveCases()
	}

	// Рекурсивное добавление вложенной задачи
	addNesting = (newCase, parentId) => {
		const newId = this.generateId()

		const addNestedTask = tasks => {
			return tasks.map(task => {
				if (task.id === parentId) {
					// Если нашли родителя, добавляем новую задачу в его вложенные задачи
					return {
						...task,
						nesting: [
							...(task.nesting || []),
							{ ...newCase, id: newId, nesting: [], isDone: false },
						],
					}
				}
				// Рекурсивно ищем в вложенных задачах
				return {
					...task,
					nesting: addNestedTask(task.nesting || []),
				}
			})
		}

		this.cases = addNestedTask(this.cases)
		this.saveCases()
	}

	// Переключение выполнения задачи (основной или вложенной)
	toggleTaskDone = taskId => {
		const toggleDoneRecursively = tasks => {
			return tasks.map(task => {
				if (task.id === taskId) {
					return { ...task, isDone: !task.isDone }
				}
				return {
					...task,
					nesting: toggleDoneRecursively(task.nesting || []),
				}
			})
		}

		this.cases = toggleDoneRecursively(this.cases)
		this.saveCases()
	}
	// Редактирование задачи или подзадачи
	onEdit = (taskId, updatedFields) => {
		const editTaskRecursively = tasks => {
			return tasks.map(task => {
				if (task.id === taskId) {
					// Обновляем только найденную задачу
					return { ...task, ...updatedFields }
				}
				// Рекурсивно ищем и обновляем во вложенных задачах
				return {
					...task,
					nesting: editTaskRecursively(task.nesting || []),
				}
			})
		}

		this.cases = editTaskRecursively(this.cases)
		this.saveCases()
	}

	// Удаление основной задачи
	deleteMainCase = mainCase => {
		this.cases = this.cases.filter(caseItem => caseItem.id !== mainCase.id)
		this.saveCases()
	}

	// Удаление вложенной задачи
	deleteNesting = (parentId, subTaskId) => {
		const deleteNestedTaskRecursively = tasks => {
			return tasks
				.map(task => {
					if (task.id === parentId) {
						return {
							...task,
							nesting: task.nesting.filter(subTask => subTask.id !== subTaskId),
						}
					}
					return {
						...task,
						nesting: deleteNestedTaskRecursively(task.nesting || []),
					}
				})
				.filter(task => task)
		}

		this.cases = deleteNestedTaskRecursively(this.cases)
		this.saveCases()
	}
}
