import categoryTypes from './category.types'
import axios from 'axios'

export const getAllCategory = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/category')
		if (data.status === 'FAIL') {
			console.log(data.message)
		} else {
			dispatch({
				type: categoryTypes.GET_ALL_CATEGORY_SUCCESS,
				payload: data.payload,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
