import React, { useEffect, useCallback, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import validateInput, { TYPE } from '../../utilities/validateInput'

import { registerUser } from '../../redux/user/user.actions'

import { toast } from 'react-toastify'

import Helmet from '../../components/Helmet'
import AuthContainer from '../../components/Auth/AuthContainer'
import AuthFormGroup from '../../components/Auth/AuthFormGroup'
import AuthForm from '../../components/Auth/AuthForm'
import Button from '../../components/Button'
import Marginer from '../../components/Marginer'

const Register = () => {
	const history = useHistory()

	const dispatch = useDispatch()

	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [rePassword, setRePassword] = useState({ value: '', error: '' })

	const validateEmail = useCallback(() => {
		const error = validateInput(email.value, TYPE.EMAIL)
		setEmail({
			...email,
			error,
		})
		return error
	}, [email.value])

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

	const handleRegister = (e) => {
		e.preventDefault()

		if (!!validateEmail() | !!validatePassword() | !!validateRePassword()) {
			return toast.error('Vui lòng nhập đầy đủ thông tin hợp lệ !')
		}

		dispatch(
			registerUser({ email: email.value, password: password.value }, history)
		)
	}

	useEffect(() => {
		if (!password.error && password.value !== '' && rePassword.value !== '') {
			validateRePassword()
		}
	}, [password.error, rePassword.value, password.value])

	return (
		<Helmet title='Đăng ký'>
			<AuthContainer title={'Đăng ký'}>
				<AuthForm onSubmit={handleRegister}>
					<AuthFormGroup
						type={'text'}
						value={email.value}
						error={email.error}
						labelText={'Email'}
						onChange={(e) =>
							setEmail({ ...email, value: e.target.value })
						}
						onBlur={validateEmail}
						placeholder='Nhập email của bạn'
					/>
					<AuthFormGroup
						type={'password'}
						value={password.value}
						error={password.error}
						labelText={'Mật khẩu'}
						onChange={(e) =>
							setPassword({ ...password, value: e.target.value })
						}
						onBlur={validatePassword}
						placeholder='Nhập mật khẩu của bạn'
					/>
					<AuthFormGroup
						type={'password'}
						value={rePassword.value}
						error={rePassword.error}
						labelText={'Nhập lại mật khẩu'}
						onChange={(e) =>
							setRePassword({ ...rePassword, value: e.target.value })
						}
						onBlur={validateRePassword}
						placeholder='Nhập lại mật khẩu của bạn'
					/>

					<Marginer margin={20} />

					<Button>Đăng ký</Button>
				</AuthForm>

				<div className='auth__link'>
					<div className='auth__link__item'>
						<Link to='/recovery' className='auth__link__item__link'>
							Quên mật khẩu
						</Link>
					</div>
					<div className='auth__link__item'>
						<span className='auth__link__item__text'>
							Đã có tài khoản?
						</span>
						<Link to='/login' className='auth__link__item__link'>
							Đăng nhập
						</Link>
					</div>
				</div>
			</AuthContainer>
		</Helmet>
	)
}

export default Register
