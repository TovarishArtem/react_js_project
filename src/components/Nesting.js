import React, { Component } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export class Nesting extends Component {
	render() {
		const { case: caseItem, isDone, fun } = this.props

		return (
			<div className='nesting' onClick={() => this.props.forText(caseItem)}>
				<div className={`number_nesting ${caseItem.id}`}>
					<div className={`user ${isDone ? 'done' : ''}`}>
						<div className='span_and_p'>
							<IoIosArrowBack className='arrow' />
							<li>{caseItem.title}</li>
						</div>
						<input
							type='checkbox'
							checked={isDone} // Управляемое состояние чекбокса
							onChange={fun} // Обработчик для изменения состояния
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
					</div>
				</div>
			</div>
		)
	}
}

export default Nesting
