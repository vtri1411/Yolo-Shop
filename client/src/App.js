import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from './layout/MainLayout'

import { loadUser } from './redux/user/user.actions'
import { getAllCategory } from './redux/category/category.actions'
import { getAllColor } from './redux/color/color.actions'
import { getAllSize } from './redux/size/size.actions'
import { getAllBrand } from './redux/brand/brand.actions'
import { loadUserCart, clearCart } from './redux/cart/cart.actions'

const mapState = ({ user }) => ({ user: user.user })

function App() {
	const dispatch = useDispatch()

	const { user } = useSelector(mapState)

	useEffect(() => {
		dispatch(loadUser())
		dispatch(getAllCategory())
		dispatch(getAllColor())
		dispatch(getAllSize())
		dispatch(getAllBrand())
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(loadUserCart())
		} else {
			dispatch(clearCart())
		}
	}, [user])

	return <MainLayout />
}

export default App
