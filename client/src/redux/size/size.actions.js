import sizeTypes from './size.types'
import axios from 'axios'

export const getAllSize = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/size')
		if (data.status === 'FAIL') {
			console.log(data.message)
		} else {
			dispatch({
				type: sizeTypes.GET_ALL_SIZE_SUCCESS,
				payload: data.payload,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
