import colorTypes from './color.types'

const initialState = {
	colors: null, // [{name, hex}]
}

const colorReducer = (state = initialState, action) => {
	switch (action.type) {
		case colorTypes.GET_ALL_COLOR_SUCCESS:
			return {
				...state,
				colors: action.payload,
			}
		default:
			return state
	}
}

export default colorReducer
