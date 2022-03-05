import React from 'react'
import Input from '../Input'

const UserFormGroup = ({
	type,
	value,
	onChange,
	readOnly,
	label,
	error,
	onBlur,
}) => {
	return (
		<div className='user__form__group'>
			<label className='user__form__label'>{label}</label>
			<Input
				error={error}
				onBlur={onBlur}
				type={type}
				className='user__form__input'
				value={value}
				readOnly={readOnly}
				onChange={readOnly ? () => {} : onChange}
			/>
		</div>
	)
}

export default UserFormGroup
