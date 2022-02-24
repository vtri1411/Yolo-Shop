import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: []

const initialState = {
	value: cart,
}

export const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {
		addItem: (state, action) => {},
		removeItem: (state, action) => {},
	},
})

export const { addItem, removeItem } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
