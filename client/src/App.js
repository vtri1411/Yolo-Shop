import React from 'react'

import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'

import { Provider } from 'react-redux'

import store from './redux/store'

import MainLayout from './layout/MainLayout'

function App() {
	return (
		<Provider store={store}>
			<MainLayout />
		</Provider>
	)
}

export default App
