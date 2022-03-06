import React from 'react'
import Input from '../Input'

const UserFormGroup = ({
	type,
	value,
	onChange,
	readOnly,
	label,
	error,
	className,
	onBlur,
}) => {
	return (
		<div className={`user__form__group ${className}`}>
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
