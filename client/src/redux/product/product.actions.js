import productTypes from './product.types'
import axios from 'axios'
import { toast } from 'react-toastify'
import toastUpdate from '../../config/toastUpdate'

export const getProducts =
	({ filter, keyword, sort, limit, offset, isAppend } = {}) =>
	async (dispatch) => {
		try {
			console.log(filter, keyword, sort, limit, offset)
			const { data } = await axios.post('/api/product/filter', {
				filter,
				keyword,
				sort,
				limit,
				offset,
			})

			if (data.status === 'SUCCESS') {
				dispatch({
					type: isAppend
						? productTypes.APPEND_PRODUCTS
						: productTypes.SET_PRODUCTS,
					payload: data.payload,
				})
				return
			}
		} catch (error) {
			console.log(error)
		}
	}

// Clear product
export const clearProduct = () => ({
	type: productTypes.SET_PRODUCT,
	payload: null,
})

export const getProductById = (id) => async (dispatch) => {
	try {
		dispatch(clearProduct())
		const { data } = await axios.get(`/api/product/${id}`)
		if (data.status === 'SUCCESS') {
			dispatch({
				type: productTypes.SET_PRODUCT,
				payload: data.payload,
			})
			return
		}
	} catch (error) {
		console.log(error)
	}
	toast.error('Tải thông tin sản phẩm thất bại!')
}

export const setShowProductModal = (isShow) => ({
	type: productTypes.SET_SHOW_PRODUCT_MODAL,
	payload: isShow,
})

export const setIsLoadingProductModal = (isLoading) => ({
	type: productTypes.SET_IS_LOADING_PRODUCT_MODAL,
	payload: isLoading,
})

export const setProductModal = (id) => async (dispatch) => {
	try {
		dispatch({
			type: productTypes.SET_SHOW_PRODUCT_MODAL,
			payload: true,
		})

		const { data } = await axios.get(`/api/product/${id}`)

		if (data.status === 'SUCCESS') {
			toast.success('Tải thông tin sản phẩm thành công!')
			dispatch({
				type: productTypes.SET_PRODUCT_MODEL,
				payload: data.payload,
			})
			return
		} else {
			dispatch({
				type: productTypes.SET_SHOW_PRODUCT_MODAL,
				payload: false,
			})
		}
	} catch (error) {
		console.log(error)
	}
	toast.error('Tải thông tin sản phẩm thất bại!')
}
