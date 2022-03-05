import userTypes from './user.types'

const initialState = {
	user: null,
	isLoadingUser: true,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.LOAD_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoadingUser: false,
			}
		case userTypes.LOAD_USER_ERROR:
			return {
				...state,
				isLoadingUser: false,
			}
		case userTypes.LOGOUT_USER:
			return {
				...state,
				user: null,
				isLoadingUser: false,
			}
		case userTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoadingUser: false,
			}
		case userTypes.CHANGE_USER_INFO:
			return {
				...state,
				user: {
					...state.user,
					name: action.payload.name,
					avatar: action.payload.avatar,
					phone: action.payload.phone,
					address: action.payload.address,
				},
			}
		default:
			return state
	}
}

export default userReducer
