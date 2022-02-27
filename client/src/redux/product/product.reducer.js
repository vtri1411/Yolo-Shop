import productTypes from './product.types'

const initialState = {
	products: null, // [{}]
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.GET_ALL_PRODUCT_SUCCESS:
			console.log({ action })
			return {
				...state,
				products: action.payload,
			}
		default:
			return state
	}
}

export default productReducer
