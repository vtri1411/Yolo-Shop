import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	isLoading: true,
}

const reducer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.isLoading = action.payload
		},
	},
})
