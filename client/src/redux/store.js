import { configureStore } from '@reduxjs/toolkit'
import productModalReducer from './product-modal/productModalSlice'
import shoppingCartReducer from './shopping-cart/shoppingCartSlice'

const store = configureStore({
	reducer: {
		productModal: productModalReducer,
		shoppingCart: shoppingCartReducer,
	},
})

export default store
