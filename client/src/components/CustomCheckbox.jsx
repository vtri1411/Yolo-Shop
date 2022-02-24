import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = (props) => {
	const onChange = (e) => {
		if (props.onChange) {
			props.onChange(e.target)
		}
	}

	return (
		<label className='custom-checkbox'>
			<input
				type='checkbox'
				onChange={(e) => onChange(e)}
				checked={props.checked}
			/>
			<span className='custom-checkbox__checkmark'>
				<i className='bx bx-check'></i>
			</span>
			<span className='custom-checkbox__txt'>{props.label}</span>
		</label>
	)
}

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	checked: PropTypes.bool
}

export default Checkbox
