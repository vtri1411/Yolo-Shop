import React from 'react'
import Input from '../Input'

const AuthFormGroup = ({
	labelText,
	value,
	error,
	onChange,
	onBlur,
	type,
	id,
	placeholder,
}) => {
	return (
		<div className='auth__form__group'>
			<label htmlFor={id} className='auth__form__group__label'>
				{labelText}
				<Input
					type={type}
					id={id}
					placeholder={placeholder}
					value={value}
					error={error}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</label>
		</div>
	)
}

export default AuthFormGroup
