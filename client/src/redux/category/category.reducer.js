import categoryTypes from './category.types'

const initialState = {
	categories: null, // []
}

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case categoryTypes.GET_ALL_CATEGORY_SUCCESS:
			return {
				...state,
				categories: action.payload,
			}
		default:
			return state
	}
}

export default categoryReducer
