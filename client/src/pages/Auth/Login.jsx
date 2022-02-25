import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Input from '../../components/AuthForm/Input'
import Button from '../../components/Button'
import Helmet from '../../components/Helmet'
import Marginer from '../../components/Marginer'

import checkInput, { type } from '../../utilities/checkInput'

const Login = () => {
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	const handleBlurEmail = useCallback(() => {
		setEmailOrPhone({
			...email,
			error: checkInput(email.value, type.EMAIL),
		})
	}, [email.value, email.error])

	const handleBlurPassword = useCallback(() => {
		setPassword({
			...password,
			error: checkInput(password.value, type.PASSWORD),
		})
	}, [password.value, password.error])

	return (
		<Helmet title='Đăng nhập'>
			<div className='auth'>
				<h3 className='auth__title'>Đăng nhập</h3>
				<form className='auth__form'>
					<div className='auth__form__group'>
						<label
							htmlFor='login-id'
							className='auth__form__group__label'
						>
							Email hoặc số điện thoại
						</label>
						<Input
							type='text'
							id='login-id'
							placeholder='Email hoặc số điện thoại'
							value={email.value}
							error={email.error}
							onChange={(e) =>
								setEmail({
									...emailOrPhone,
									value: e.target.value,
								})
							}
							onBlur={handleBlurEmail}
						/>
					</div>
					<div className='auth__form__group'>
						<label
							htmlFor='login-password'
							className='auth__form__group__label'
						>
							Mật khẩu
						</label>
						<Input
							type='password'
							id='login-password'
							placeholder='Mật khẩu'
							value={password.value}
							error={password.error}
							onChange={(e) =>
								setPassword({ ...password, value: e.target.value })
							}
							onBlur={handleBlurPassword}
						/>
					</div>
					<Marginer margin='20px' />
					<Button>Đăng nhập</Button>
				</form>
				<div className='auth__option'>
					<div className='auth__option'>
						<Link to='/recovery' className='auth__option__link'>
							Quên mật khẩu
						</Link>
					</div>
					<div className='auth__option'>
						<span className='auth__option__text'>Chưa có tài khoản?</span>
						<Link to='/register' className='auth__option__link'>
							Đăng ký
						</Link>
					</div>
				</div>
				<div className='auth__oauth'>
					<a href={getGoogleOAuthUrl()}>Google oauth</a>
				</div>
			</div>
		</Helmet>
	)
}

export default Login

const getGoogleOAuthUrl = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

	const options = {
		client_id:
			'1082897750063-htja233etc5m6lvaq3fq6sk9c38oeqas.apps.googleusercontent.com',
		redirect_uri: 'http://localhost:3000/oauth',
		response_type: 'token',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
		prompt: 'consent',
	}

	const qs = new URLSearchParams(options)

	return `${rootUrl}?${qs.toString()}`
}
