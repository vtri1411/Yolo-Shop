import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ onChange, label, checked }) => {
	return (
		<label className='custom-checkbox'>
			<input
				type='checkbox'
				onChange={onChange ? onChange : null}
				checked={checked}
			/>
			<span className='custom-checkbox__checkmark'>
				<i className='bx bx-check'></i>
			</span>
			<span className='custom-checkbox__txt'>{label}</span>
		</label>
	)
}

export default Checkbox
