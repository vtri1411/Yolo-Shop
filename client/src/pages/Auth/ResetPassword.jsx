import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import validateInput, { TYPE } from '../../utilities/validateInput'

import { toast } from 'react-toastify'

import AuthContainer from '../../components/Auth/AuthContainer'
import AuthFormGroup from '../../components/Auth/AuthFormGroup'
import AuthForm from '../../components/Auth/AuthForm'
import Button from '../../components/Button'
import Helmet from '../../components/Helmet'
import Marginer from '../../components/Marginer'
import { resetPassword } from '../../redux/user/user.actions'

const mapState = ({ user }) => ({ user: user.user })

const ResetPassword = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const { userId, secretString } = useParams()

	const { user } = useSelector(mapState)

	const [password, setPassword] = useState({ value: '', error: '' })
	const [rePassword, setRePassword] = useState({ value: '', error: '' })

	const validatePassword = useCallback(() => {
		const error = validateInput(password.value, TYPE.PASSWORD)
		setPassword({
			...password,
			error,
		})
		return error
	}, [password.value])

	const validateRePassword = useCallback(() => {
		const error = validateInput(
			rePassword.value,
			[TYPE.PASSWORD, TYPE.REPASSWORD],
			password.value
		)
		setRePassword({
			...rePassword,
			error,
		})
		return error
	}, [rePassword.value, password.value])

	const handleResetPassword = (e) => {
		e.preventDefault()

		if (!!validatePassword() | !!validateRePassword()) {
			return toast.error('Vui lòng nhập đầy đủ thông tin hợp lệ !')
		}

		dispatch(
			resetPassword(
				{ userId, newPassword: password.value, secretString },
				history
			)
		)
	}
	useEffect(() => {
		if (!password.error && password.value !== '' && rePassword.value !== '') {
			validateRePassword()
		}
	}, [password.error, rePassword.value, password.value])

	useEffect(() => {
		if (user) history.push('/')
	}, [user])

	return (
		<Helmet title='Đặt lại mật khẩu'>
			<AuthContainer title={'Đặt lại mật khẩu'}>
				<AuthForm onSubmit={handleResetPassword}>
					<AuthFormGroup
						type={'password'}
						value={password.value}
						error={password.error}
						labelText={'Mật khẩu mới'}
						onChange={(e) =>
							setPassword({ ...password, value: e.target.value })
						}
						onBlur={validatePassword}
						placeholder='Nhập mật khẩu mới'
					/>
					<AuthFormGroup
						type={'password'}
						value={rePassword.value}
						error={rePassword.error}
						labelText={'Nhập lại mật khẩu mới'}
						onChange={(e) =>
							setRePassword({ ...rePassword, value: e.target.value })
						}
						onBlur={validateRePassword}
						placeholder='Nhập lại mật khẩu mới'
					/>

					<Marginer margin={20} />

					<Button>Xác nhận</Button>
				</AuthForm>
			</AuthContainer>
		</Helmet>
	)
}

export default ResetPassword
