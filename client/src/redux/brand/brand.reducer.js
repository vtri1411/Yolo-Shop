import brandTypes from './brand.types'

const initialState = {
	brands: null, // []
}

const brandReducer = (state = initialState, action) => {
	switch (action.type) {
		case brandTypes.GET_ALL_BRAND_SUCCESS:
			return {
				...state,
				brands: action.payload,
			}
		default:
			return state
	}
}

export default brandReducer
