import orderTypes from './order.types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { clearCart, loadUserCart } from '../cart/cart.actions'
import toastUpdate from '../../config/toastUpdate'

export const getOrderHistory = () => async (dispatch) => {
	try {
		const { data, payload } = await axios.get('/api/order')
		if (data.status === 'SUCCESS') {
			return dispatch({
				type: orderTypes.SET_ORDER_HISTORY,
				payload: data.payload,
			})
		} else {
			console.log(data.message)
		}
	} catch (error) {
		console.log(error)
	}
	toast.error('Tải lịch sử mua hàng thất bại!')
}

export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch(clearOrderDetails())
   		const { data } = await axios.get(`/api/order/${id}`)
		if (data.status === 'SUCCESS') {
			return dispatch({
				type: orderTypes.SET_ORDER_DETAILS,
				payload: data.payload,
			})
		}
	} catch (error) {
		console.log(error)
	}
	toast.error('Tải chi tiết mua hàng thất bại!')
}

export const orderProducts = () => async (dispatch) => {
	const toastId = toast.loading('Đang đặt hàng . . .')
	try {
		const { data } = await axios.post('/api/order')

		console.log({ data })

		if (data.status === 'SUCCESS') {
			toast.update(toastId, {
				render: 'Đặt hàng thành công!',
				type: 'success',
				...toastUpdate,
			})
			return dispatch(clearCart())
		}

		switch (data.code) {
			case 611:
				return toast.update(toastId, {
					render: 'Giỏ hàng trống!',
					type: 'error',
					...toastUpdate,
				})
			case 612:
				dispatch(loadUserCart)
				return toast.update(toastId, {
					render: 'Giỏ hàng có sản phẩm không hợp lệ!',
					type: 'error',
					...toastUpdate,
				})
		}
	} catch (error) {
		console.log(error)
	}
	toast.update(toastId, {
		render: 'Đặt hàng không thành công!',
		type: 'error',
		...toastUpdate,
	})
}

export const clearOrderDetails = () => ({
	type: orderTypes.SET_ORDER_DETAILS,
	payload: [],
})
