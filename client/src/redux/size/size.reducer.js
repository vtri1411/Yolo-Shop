import sizeTypes from './size.types'

const initialState = {
	sizes: null, //[]
}

const sizeReducer = (state = initialState, action) => {
	switch (action.type) {
		case sizeTypes.GET_ALL_SIZE_SUCCESS:
			return {
				...state,
				sizes: action.payload,
			}
		default:
			return state
	}
}

export default sizeReducer
