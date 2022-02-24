import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductViewModal from '../components/ProductViewModal'
import AuthFormModal from '../components/AuthForm/AuthFormModal'

import Routes from '../routes/Routes'
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
						{/* <AuthFormModal /> */}
					</>
				)}
			/>
		</BrowserRouter>
	)
}

export default MainLayOut
