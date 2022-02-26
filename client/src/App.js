import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from './layout/MainLayout'

import { loadUser } from './redux/user/user.actions'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUser())
	})

	return <MainLayout />
}

export default App
