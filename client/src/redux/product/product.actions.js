import productTypes from './product.types'
import axios from '../../config/axios'
import { toast } from 'react-toastify'
import toastUpdate from '../../config/toastUpdate'

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

export const getProductById = (id) => async (dispatch) => {
	const toastId = toast.loading(
		'Đang tải thông tin sản phẩm, vui lòng chờ . . .'
	)
	try {
		const { data } = await axios.get(`/product/${id}`)
		if (data.status === 'SUCCESS') {
			toast.update(toastId, {
				render: 'Tải thông tin sản phẩm thành công',
				type: 'success',
				...toastUpdate,
			})
			dispatch({
				type: productTypes.GET_PRODUCT_SUCCESS,
				payload: data.payload,
			})
		} else {
			toast.update(toastId, {
				render: 'Tải thông tin sản phẩm thất bại, vui lòng thử lại',
				type: 'error',
				...toastUpdate,
			})
		}
	} catch (error) {
		console.log(error)
		toast.update(toastId, {
			render: 'Có lỗi xảy ra, vui lòng thử lại',
			type: 'error',
			...toastUpdate,
		})
	}
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
	const toastId = toast.loading('Đang tải sản phẩm, vui lòng chờ . . . ')
	try {
		dispatch({
			type: productTypes.SET_SHOW_PRODUCT_MODAL,
			payload: true,
		})

		const { data } = await axios.get(`/product/${id}`)
		if (data.status === 'SUCCESS') {
			toast.update(toastId, {
				render: 'Tải sản phẩm thành công',
				type: 'success',
				...toastUpdate,
			})
			dispatch({
				type: productTypes.SET_PRODUCT_MODEL,
				payload: data.payload,
			})
		} else {
			toast.update(toastId, {
				render: 'Tải sản phẩm thất bại!',
				type: 'error',
				...toastUpdate,
			})
			dispatch({
				type: productTypes.SET_SHOW_PRODUCT_MODAL,
				payload: false,
			})
		}
	} catch (error) {
		console.log(error)
		toast.update(toastId, {
			render: 'Có lỗi xảy ra!',
			type: 'error',
			...toastUpdate,
		})
	}
}
