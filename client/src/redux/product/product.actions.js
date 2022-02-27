import productTypes from './product.types'
import axios from '../../config/axios'

export const getAllProducts =
	({ filter, searchInput, sort } = {}) =>
	async (dispatch) => {
		console.log({ filter, searchInput, sort })
		try {
			const { data } = await axios.get('/product')

			console.log({ data })

			if (data.status === 'FAIL') {
				console.log({ message: data.message })
			} else {
				console.log('dispatch')
				dispatch({
					type: productTypes.GET_ALL_PRODUCT_SUCCESS,
					payload: data.payload,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
