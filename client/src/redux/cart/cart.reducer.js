import cartTypes from './cart.types'

const initialState = {
	cart: null, // []
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case cartTypes.SET_USER_CART:
			return {
				...state,
				cart: action.payload,
			}
		case cartTypes.CHANGE_PRODUCT_QUANTITY: {
			if (!Array.isArray(state.cart)) return state

			const index = state.cart.findIndex(
				(item) => item.inventoryId === action.payload.inventoryId
			)
			if (index === -1) return state

			state.cart[index].quantity = action.payload.quantity

			return {
				...state,
				cart: [...state.cart],
			}
		}
		case cartTypes.DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				cart: Array.isArray(state.cart)
					? state.cart.filter(
							(item) => item.inventoryId !== action.payload
					  )
					: null,
			}

		default:
			return state
	}
}

export default userReducer
