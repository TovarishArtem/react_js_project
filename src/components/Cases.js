import React from 'react'
import { observer } from 'mobx-react-lite'
import Case from './Case'
import TextCase from './TextCase'

const Cases = observer(
	({
		cases,
		onSave,
		onDeleteMain,
		onDeleteNesting,
		forTextMethod,
		addNesting,
		onEdit,
	}) => {
		const [selectedCase, setSelectedCase] = React.useState(null)

		// Функция выбора задачи
		const handleSelectCase = caseItem => {
			setSelectedCase(caseItem)
			forTextMethod(caseItem)
		}

		// Функция обработки редактирования
		const handleEdit = (taskId, updatedFields) => {
			onEdit(taskId, updatedFields) // Обновляем задачу через переданный метод onEdit

			// Обновляем selectedCase, если редактируемая задача совпадает с выбранной
			if (selectedCase?.id === taskId) {
				setSelectedCase(prevCase => ({
					...prevCase,
					...updatedFields,
				}))
			}
		}

		return cases.length > 0 ? (
			<div className='container_case_textCase'>
				<div className='container_users'>
					{console.log(cases)}
					{cases.map(el => (
						<Case
							key={el.id}
							case={el}
							addNesting={addNesting}
							onDeleteMain={onDeleteMain}
							onDeleteNesting={onDeleteNesting}
							selectCase={handleSelectCase}
						/>
					))}
				</div>
				{selectedCase ? (
					<TextCase onEdit={handleEdit} case={selectedCase} />
				) : (
					<h3 className='h3_textCase'>Выберите задачу для отображения</h3>
				)}
			</div>
		) : (
			<div className='user'>
				<h3>Нет задач</h3>
			</div>
		)
	}
)

export default Cases
