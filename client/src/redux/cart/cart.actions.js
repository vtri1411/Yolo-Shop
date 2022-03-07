import cartTypes from './cart.types'
import axios from 'axios'
import { toast } from 'react-toastify'
import toastUpdate from '../../config/toastUpdate'

export const loadUserCart = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/cart')
		dispatch({
			type: cartTypes.SET_USER_CART,
			payload: data.payload,
		})
	} catch (error) {
		console.log(error)
		toast.error('Tải thông tin giỏ hàng thất bại!')
	}
}

export const clearCart = () => ({
	type: cartTypes.SET_USER_CART,
	payload: null,
})

export const changeQuantity =
	({ quantity, inventoryId }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.post('/api/cart/changeQuantity', {
				quantity,
				inventoryId,
			})
			if (data.status === 'SUCCESS') {
				dispatch(loadUserCart())
				toast.dismiss()
				toast.success('Thay đổi số lượng sản phẩm thành công!')
				return
			} else {
				console.log(data.message)
			}
		} catch (error) {
			console.log(error)
		}
		toast.dismiss()
		toast.error('Thay đổi số lượng sản phẩm thất bại!')
	}

export const addProduct =
	({ inventoryId, quantity }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.post('/api/cart/addProduct', {
				inventoryId,
				quantity,
			})

			toast.dismiss()

			if (data.status === 'SUCCESS') {
				dispatch(loadUserCart())
				toast.success('Thêm sản phẩm vào giỏ hàng thành công!')
				return
			}

			switch (data.code) {
				case 610:
					toast.dismiss()
					return toast.error('Só lượng sản phẩm trong kho không đủ!')
			}
		} catch (error) {
			console.log(error)
		}
		toast.dismiss()
		toast.error('Thêm sản phẩm vào giỏ hàng thất bại!')
	}

export const deleteProduct =
	({ inventoryId }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.delete('/api/cart', {
				data: {
					inventoryId: inventoryId,
				},
			})
			if (data.status === 'SUCCESS') {
				toast.success('Xoá sản phẩm thành công!')
				dispatch({
					type: cartTypes.DELETE_PRODUCT_SUCCESS,
					payload: inventoryId,
				})
				return
			}
		} catch (error) {
			console.log(error)
		}
		toast.error('Xoá sản phẩm thất bại!')
	}
