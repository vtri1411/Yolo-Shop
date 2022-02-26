import React, { useCallback, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import googleLoginImg from '../../assets/images/btn_google_login.png'

import validateInput, { TYPE } from '../../utilities/validateInput'
import googleOauthUrl from '../../utilities/googleOauthUrl'

import { loginUser } from '../../redux/user/user.actions'

import { toast } from 'react-toastify'

import Helmet from '../../components/Helmet'
import AuthContainer from '../../components/Auth/AuthContainer'
import AuthFormGroup from '../../components/Auth/AuthFormGroup'
import AuthForm from '../../components/Auth/AuthForm'
import Button from '../../components/Button'
import Marginer from '../../components/Marginer'

const Login = () => {
	const history = useHistory()

	const dispatch = useDispatch()

	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

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

	const handleLogin = (e) => {
		e.preventDefault()

		if (!!validateEmail() | !!validatePassword()) {
			return toast.error('Vui lòng nhập đầy đủ thông tin !')
		}

		dispatch(
			loginUser({ email: email.value, password: password.value }, history)
		)
	}

	return (
		<Helmet title='Đăng nhập'>
			<AuthContainer title={'Đăng nhập'}>
				<AuthForm onSubmit={handleLogin}>
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
						id={'login-email'}
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
						id='login-password'
					/>

					<Marginer margin={20} />

					<Button>Đăng nhập</Button>
				</AuthForm>

				{/* <AuthError error={loginError} /> */}

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
						<Link to='/register' className='auth__link__item__link'>
							Đăng nhập
						</Link>
					</div>
				</div>

				<div className='auth__oauth'>
					<a className='auth__oauth__item' href={googleOauthUrl}>
						<img src={googleLoginImg} alt='Login with google' />
					</a>
				</div>
			</AuthContainer>
		</Helmet>
	)
}

export default Login