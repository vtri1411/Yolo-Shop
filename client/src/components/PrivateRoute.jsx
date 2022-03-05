import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const mapState = ({ user }) => ({
	user: user.user,
	isLoadingUser: user.isLoadingUser,
})
const PrivateRoute = ({ path, component, exact }) => {
	const { user, isLoadingUser } = useSelector(mapState)

	return isLoadingUser ? null : user ? (
		<Route path={path} exact={exact} component={component} />
	) : (
		<Redirect to='/' />
	)
}

export default PrivateRoute
