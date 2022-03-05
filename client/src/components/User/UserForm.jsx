import React from 'react'

const UserForm = ({ children, onSubmit, className }) => {
	return (
		<form
			className={`user__form ${className ? className : ''}`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}

export default UserForm
