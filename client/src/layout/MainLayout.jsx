import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Routes from '../routes/Routes'

import { ToastContainer } from 'react-toastify'

import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductViewModal from '../components/ProductViewModal'
import Maginer from '../components/Marginer'

const MainLayOut = () => {
	return (
		<BrowserRouter>
			<Route
				render={(props) => (
					<>
						<Header />
						<div className='container'>
							<div className='main'>
								<Routes />
							</div>
						</div>
						<Maginer margin={40} />
						<Footer />
						<ProductViewModal />
						<ToastContainer
							theme='dark'
							position='top-center'
							hideProgressBar={true}
						/>
					</>
				)}
			/>
		</BrowserRouter>
	)
}

export default MainLayOut
