import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'

import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'

import MainLayout from './layout/MainLayout'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({
			type: 'LOGIN_USER',
		})
	})

	return <MainLayout />
}

export default App
