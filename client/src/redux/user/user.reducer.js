import userTypes from './user.types'

const initialState = {
	user: null,
	isLoading: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.LOGIN_USER:
			return {
				...state,
			}
		default:
			return state
	}
}

export default userReducer
