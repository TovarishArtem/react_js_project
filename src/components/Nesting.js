import React, { Component } from 'react'

export class Nesting extends Component {
	render() {
		const { case: caseItem, isDone, fun } = this.props

		return (
			<div className='nesting'>
				<div className={`number_nesting ${caseItem.id}`}>
					<div className={`user ${isDone ? 'done' : ''}`}>
						<div className='span_and_p'>
							<span className='material-symbols-outlined'>chevron_left</span>
							<li>{caseItem.text}</li>
						</div>
						<input
							type='checkbox'
							checked={isDone} // Управляемое состояние чекбокса
							onChange={fun} // Обработчик для изменения состояния
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Nesting
