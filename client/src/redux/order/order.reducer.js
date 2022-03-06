import orderTypes from './order.types'

const initialState = {
	orders: [], //[]
	orderDetails: [], // []
}

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case orderTypes.SET_ORDER_HISTORY:
			return {
				...state,
				orders: action.payload,
			}
		case orderTypes.SET_ORDER_DETAILS:
			return {
				...state,
				orderDetails: action.payload,
			}
		default:
			return state
	}
}

export default orderReducer
