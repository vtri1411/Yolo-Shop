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

export const logOutUser = (history) => async (dispatch) => {
	try {
		await axios.get('/api/auth/logout')
		dispatch({
			type: userTypes.LOGOUT_USER,
		})
		history.push('/login')
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

		console.log({ idFirst: toastId })
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
					render: 'Đăng ký thành công, vui lòng kiểm tra email của bạn!',
					type: 'success',
					...toastUpdate,
				})

				return history.push('/verification-user')
			}

			switch (data.code) {
				case 606:
					console.log({ code: data.code })
					toast.update(toastId, {
						render: 'Email đã được sử dụng!',
						type: 'error',
						...toastUpdate,
					})
					return
				default:
					throw new Error()
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Đăng ký không thành công!',
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
	({ email }) =>
	async (dispatch) => {
		const toastId = toast.loading(
			'Đang xử lý đặt lại mật khẩu, vui lòng chờ . . .'
		)

		try {
			const { data } = await axios.post('/api/user/recovery/request', {
				email,
			})

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render:
						'Đặt lại mật khẩu thành công, vui lòng kiểm tra email của bạn !',
					type: 'success',
					...toastUpdate,
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

			if (data.status === 'SUCCESS') {
				toast.update(toastId, {
					render: 'Đặt lại mật khẩu thành công !',
					type: 'success',
					...toastUpdate,
				})

				dispatch(loadUser())
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					...toastUpdate,
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
		const toastId = toast.loading('Đang đổi thông tin . . .')
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
				return toast.update(toastId, {
					render: 'Đổi thông tin thành công!',
					type: 'success',
					...toastUpdate,
				})
			}
		} catch (error) {
			console.log(error)
		}
		toast.update(toastId, {
			render: 'Đổi thông tin thất bại!',
			type: 'error',
			...toastUpdate,
		})
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
