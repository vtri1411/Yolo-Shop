import React, { useState } from 'react'

const Input = ({
	type,
	placeholder,
	className,
	error,
	value,
	onChange,
	onBlur,
	id,
	key,
	readOnly,
}) => {
	return (
		<div key={key} className={`input ${className ? className : ''}`}>
			<input
				id={id}
				type={type}
				value={value}
				placeholder={placeholder}
				spellCheck={false}
				onChange={onChange ? onChange : null}
				onBlur={onBlur ? onBlur : null}
				readOnly={readOnly}
				className={`input__${type} ${readOnly ? 'readonly' : ''}`}
			/>
			{error && <span className='input__err  or color-red'>{error}</span>}
		</div>
	)
}

export default Input
