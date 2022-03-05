import userTypes from './user.types'
import axios from 'axios'
import { toast } from 'react-toastify'
import toastUpdate from '../../config/toastUpdate'

export const loadUser = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/user')
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
		await axios.get('/api/auth/logout')
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
	({ email, password }, history) =>
	async (dispatch) => {
		const toastId = toast.loading('Please wait . . .')

		try {
			const { data } = await axios.post(
				'/api/auth/login',
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
					autoClose: 5000,
				})

				if (data.code === 603) {
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
				'/api/user',
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

export const reSendVerificationEmail = (email) => async (dispatch) => {
	const toastId = toast.loading('Đang gửi mail, vui lòng chờ . . .')

	try {
		const { data } = await axios.post('/api/user/verification/resend', {
			email,
		})

		if (data.status === 'SUCCESS') {
			toast.update(toastId, {
				render: 'Gửi mail thành công, vui lòng kiểm tra email của bạn!',
				type: 'success',
				...toastUpdate,
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
			render: 'Có lỗi xảy ra khi gửi mail!',
			type: 'error',
			...toastUpdate,
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
			const { data } = await axios.post('/api/user/recovery/request', {
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
			const { data } = await axios.post('/api/user/recovery/reset', {
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

export const changeInfo =
	({ name, phone, avatar, address }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.post('/api/user/changeInfo', {
				name,
				phone,
				avatar,
				address,
			})

			if ((data.status = 'SUCCESS')) {
				dispatch({
					type: userTypes.CHANGE_USER_INFO,
					payload: { name, phone, avatar, address },
				})
				return toast.success('Đổi thông tin thành công!')
			}
		} catch (error) {
			console.log(error)
		}
		toast.error('Đổi thông tin thất bại!')
	}

export const changePassword =
	({ newPassword }) =>
	async (dispatch) => {
		try {
			console.log({ newPassword })
			const { data } = await axios.post('/api/user/changePassword', {
				newPassword,
			})
			console.log({ data })
			if (data.status === 'SUCCESS')
				return toast.success('Đổi mật khẩu thành công!')
		} catch (error) {
			console.log(error)
		}
		toast.error('Đổi mật khẩu thất bại!')
	}
