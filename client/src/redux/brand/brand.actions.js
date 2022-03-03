import axios from 'axios'
import brandTypes from './brand.types'

export const getAllBrand = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/brand')
		if (data.status === 'FAIL') {
			console.log(data.message)
		} else {
			dispatch({
				type: brandTypes.GET_ALL_BRAND_SUCCESS,
				payload: data.payload,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
