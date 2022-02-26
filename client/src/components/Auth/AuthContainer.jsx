import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const mapState = ({ user }) => ({ user: user.user })

const AuthContainer = ({ children, title }) => {
	const history = useHistory()

	const { user } = useSelector(mapState)

	useEffect(() => {
		if (user) history.push('/')
	}, [user, history])

	return (
		<div className='auth'>
			<h3 className='auth__title'>{title}</h3>
			{children}
		</div>
	)
}

export default AuthContainer
