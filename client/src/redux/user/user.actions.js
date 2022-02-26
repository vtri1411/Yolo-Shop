import userTypes from './user.types'
import axios from '../../config/axios'
import { toast } from 'react-toastify'

const toastUpdate = {
	isLoading: false,
	hideProgressBar: false,
	autoClose: 5000,
	position: 'top-center',
	closeOnClick: true,
}

export const loadUser = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/auth')
		dispatch({
			type: userTypes.LOAD_USER_SUCCESS,
			payload: data.payload,
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: userTypes.LOAD_USER_ERROR,
		})
	}
}

export const logOutUser = () => async (dispatch) => {
	try {
		await axios.get('/auth/logout')
		dispatch({
			type: userTypes.LOGOUT_USER,
		})
		toast('Đăng xuất thành công!', { position: 'top-center' })
	} catch (error) {
		console.log(error)
		toast.error('Đăng xuất thất bại!')
	}
}

export const loginUser =
	({ email, password }, callback, history) =>
	async (dispatch) => {
		const toastId = toast.loading('Please wait . . .')

		try {
			const { data } = await axios.post(
				'/auth/login',
				{
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			await new Promise((resolve, rej) => setTimeout(() => resolve(1), 5000))

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render: 'Đăng nhập thành công',
					type: 'success',
					...toastUpdate,
				})

				dispatch({
					type: userTypes.LOGIN_USER_SUCCESS,
					payload: data.payload,
				})
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					...toastUpdate,
				})

				if (data.code === '003') {
					dispatch({
						type: userTypes.SET_VERIFICATION_EMAIL,
						payload: email,
					})

					history.push('/verification-user')
				}
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Server đang gặp lỗi xin vui lòng thử lại sau !',
				type: 'error',
				...toastUpdate,
			})
		}
	}

export const registerUser =
	({ email, password }, history) =>
	async (dispatch) => {
		const toastId = toast.loading('Đang đăng ký, vui lòng chờ . . .')

		try {
			const { data } = await axios.post(
				'/user',
				{
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render: 'Đăng ký thành công',
					type: 'success',
					...toastUpdate,
				})

				dispatch({
					type: userTypes.SET_VERIFICATION_EMAIL,
					payload: email,
				})

				history.push('/verification-user')
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					...toastUpdate,
				})
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Server đang gặp lỗi xin vui lòng thử lại sau !',
				type: 'error',
				...toastUpdate,
			})
		}
	}

export const setVerificationEmail = (email) => ({
	type: userTypes.SET_VERIFICATION_EMAIL,
	payload: email,
})

export const reSendVerificationEmail = (email) => async (dispatch) => {
	const toastId = toast.loading('Đang đăng ký, vui lòng chờ . . .')

	try {
		const { data } = await axios.post('/user/verification/resend', {
			email,
		})

		if (data.status === 'SUCCESS') {
			toast.update(toastId, {
				render: 'Đăng ký thành công',
				type: 'success',
				...toastUpdate,
			})

			dispatch({
				type: userTypes.RESEND_VERIFICATION_EMAIL_SUCCESS,
			})
		} else {
			toast.update(toastId, {
				render: data.message,
				type: 'error',
				...toastUpdate,
			})
		}
	} catch (error) {
		console.log(error)
		toast.update(toastId, {
			render: 'Server đang gặp lỗi xin vui lòng thử lại sau !',
			type: 'error',
			isLoading: false,
			hideProgressBar: false,
			autoClose: 5000,
			position: 'top-center',
		})
	}
}

export const requestResetPassword =
	({ email, redirectUrl }) =>
	async (dispatch) => {
		const toastId = toast.loading(
			'Đang xử lý đặt lại mật khẩu, vui lòng chờ . . .'
		)

		try {
			const { data } = await axios.post('/user/recovery/request', {
				email,
				redirectUrl,
			})

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render:
						'Đặt lại mật khẩu thành công, vui lòng kiểm tra email của bạn !',
					type: 'success',
					isLoading: false,
					hideProgressBar: false,
					autoClose: 5000,
					position: 'top-center',
				})
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					isLoading: false,
					hideProgressBar: false,
					autoClose: 5000,
					position: 'top-center',
				})
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Server đang gặp lỗi xin vui lòng thử lại sau !',
				type: 'error',
				...toastUpdate,
			})
		}
	}

export const resetPassword =
	({ userId, secretString, newPassword }, history) =>
	async (dispatch) => {
		const toastId = toast.loading('Đang đặt lại mật khẩu, vui lòng chờ . . .')
		try {
			const { data } = await axios.post('/user/recovery/reset', {
				userId,
				secretString,
				newPassword,
			})

			console.log({ data })

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render: 'Đặt lại mật khẩu thành công !',
					type: 'success',
					isLoading: false,
					hideProgressBar: false,
					autoClose: 5000,
					position: 'top-center',
				})

				dispatch({
					type: userTypes.LOGIN_USER_SUCCESS,
					payload: data.payload,
				})
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					isLoading: false,
					hideProgressBar: false,
					autoClose: 5000,
					position: 'top-center',
				})

				if (data.code === '004') {
					history.psuh('/recovery')
				}
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Server đang gặp lỗi xin vui lòng thử lại sau !',
				type: 'error',
				...toastUpdate,
			})
		}
	}
