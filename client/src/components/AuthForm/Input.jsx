import React from 'react'

const Input = ({
	type,
	placeholder,
	className,
	error,
	value,
	onChange,
	onBlur,
	...props
}) => {
	return (
		<div {...props} className={`input ${className ? className : ''}`}>
			<input
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
