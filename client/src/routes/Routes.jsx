import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Product from '../pages/ProductDetail'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import OAuth from '../pages/Auth/OAuth'
import ResendVerification from '../pages/Auth/ResendVerification'
import ResetPassword from '../pages/Auth/ResetPassword'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Recovery from '../pages/Auth/Recovery'
import User from '../pages/User/User'
import PrivateRoute from '../components/PrivateRoute'

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={Home} />

			{/* Auth */}
			<Route path='/login' exact component={Login} />
			<Route
				path='/verification-user'
				exact
				component={ResendVerification}
			/>
			<Route path='/oauth/:type' exact component={OAuth} />
			<Route path='/register' exact component={Register} />
			<Route path='/recovery' exact component={Recovery} />
			<Route
				path='/recovery/reset/:userId/:secretString'
				exact
				component={ResetPassword}
			/>

			{/* Product */}
			<Route path='/catalog' exact component={Catalog} />
			<Route path='/product/:id' exact component={Product} />

			{/* Cart */}
			<Route path='/cart' exact component={Cart} />

			{/* User */}
			{/* <Route path='/user/:slug' exact component={User} /> */}
			<PrivateRoute path='/user/:slug' exact component={User} />

			{/* 404 */}
			<Route component={NotFound} />
		</Switch>
	)
}

export default Routes
