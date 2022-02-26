import React from 'react'

const AuthForm = ({ children, onSubmit }) => {
	return (
		<form className='auth__form' onSubmit={onSubmit}>
			{children}
		</form>
	)
}

export default AuthForm
