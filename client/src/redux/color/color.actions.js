import colorTypes from './color.types'
import axios from 'axios'

export const getAllColor = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/color')
		if (data.status === 'FAIL') {
			console.log(data.message)
		} else {
			dispatch({
				type: colorTypes.GET_ALL_COLOR_SUCCESS,
				payload: data.payload,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
