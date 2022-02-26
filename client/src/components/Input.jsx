import React from 'react'

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
}) => {
	return (
		<div key={key} className={`input ${className ? className : ''}`}>
			<input
				id={id}
				type={type}
				value={value}
				placeholder={placeholder}
				className={`input__${type}`}
				spellCheck={false}
				onChange={onChange ? onChange : null}
				onBlur={onBlur ? onBlur : null}
			/>
			{error && <span className='input__error color-red'>{error}</span>}
		</div>
	)
}

export default Input
