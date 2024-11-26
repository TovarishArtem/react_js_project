import React from 'react'
import Header from './components/Header'
import Cases from './components/Cases'
import AddCase from './components/AddCase'
import { observer } from 'mobx-react-lite'
import { CasesStore } from './components/stores/CasesStore' // Импортируем store

// Создаем экземпляр store
const taskStore = new CasesStore()

const App = observer(() => {
	return (
		<div>
			<Header title='Список задач' />
			<main>
				<Cases
					cases={taskStore.cases}
					onEdit={taskStore.onEdit}
					onDeleteMain={taskStore.deleteMainCase}
					onDeleteNesting={taskStore.deleteNesting}
					addNesting={taskStore.addNesting}
					forTextMethod={taskStore.forTextMethod}
				/>
			</main>
			<aside>
				<AddCase
					onAdd={taskStore.addMainCase}
					cases={taskStore.cases}
					addNesting={taskStore.addNesting}
				/>
			</aside>
		</div>
	)
})

export default App
