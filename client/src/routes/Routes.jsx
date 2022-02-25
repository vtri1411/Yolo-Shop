import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Product from '../pages/Product'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Recovery from '../pages/Auth/Recovery'
import OAuth from '../pages/OAuth'

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/login' exact component={Login} />
			<Route path='/oauth' exact component={OAuth} />
			<Route path='/register' exact component={Register} />
			<Route path='/recovery' exact component={Recovery} />
			<Route path='/catalog' exact component={Catalog} />
			<Route path='/catalog/:slug' exact component={Product} />
			<Route path='/cart' exact component={Cart} />
			<Route component={NotFound} />
		</Switch>
	)
}

export default Routes
