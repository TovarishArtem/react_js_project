import React, { Component } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export class Nesting extends Component {
	renderNestedCases = (cases, mainCase, level = 0) => {
		// Рекурсивное отображение вложенных задач
		return cases.map(nestedCase => (
			<Nesting
				key={nestedCase.id}
				case={nestedCase}
				main_case={mainCase}
				isDone={nestedCase.isDone || false}
				fun={() => this.props.onToggleDone(mainCase, nestedCase)}
				onDeleteNesting={this.props.onDeleteNesting}
				forText={this.props.forTextMethod}
			/>
		))
	}

	render() {
		const { case: caseItem, isDone, fun } = this.props

		return (
			<div className='nesting' onClick={() => this.props.selectCase(caseItem)}>
				<div className={`number_nesting ${caseItem.id}`}>
					<div className={`user ${isDone ? 'done' : ''}`}>
						<div className='span_and_p'>
							<IoIosArrowBack className='arrow' />
							<li>{caseItem.title}</li>
						</div>
						<input
							type='checkbox'
							checked={isDone} // Управляемое состояние чекбокса
							onChange={fun} // Обработчик изменения состояния
						/>
						<span
							onClick={() =>
								this.props.onDeleteNesting(
									this.props.main_case,
									this.props.case
								)
							}
							className='delete_icon'
						>
							x
						</span>
						<div className='add_nesting'>
							<button onClick={() => this.props.handleAddNesting(caseItem)}>
								Добавить подзадачу
							</button>
						</div>
					</div>
				</div>
				{/* Отображаем вложенные задачи, если они есть */}
				{caseItem.nesting && caseItem.nesting.length > 0 && (
					<div className='nested_cases'>
						{this.renderNestedCases(caseItem.nesting, this.props.main_case)}
					</div>
				)}
			</div>
		)
	}
}

export default Nesting
