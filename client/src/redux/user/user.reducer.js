import userTypes from './user.types'

const initialState = {
	user: null,
	isLoadingUser: true,
	verification: {
		email: '',
		isSent: false,
	},
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.LOAD_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
			}
		case userTypes.LOAD_USER_ERROR:
			return {
				...state,
				isLoading: false,
			}
		case userTypes.LOGOUT_USER:
			return {
				...state,
				user: null,
				isLoading: false,
			}
		case userTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
			}
		case userTypes.SET_VERIFICATION_EMAIL:
			return {
				...state,
				verification: {
					...state.verification,
					email: action.payload,
				},
			}
		case userTypes.RESEND_VERIFICATION_EMAIL_SUCCESS:
			return {
				...state,
				verification: {
					...state.verification,
					isSent: true,
				},
			}
		default:
			return state
	}
}

export default userReducer
