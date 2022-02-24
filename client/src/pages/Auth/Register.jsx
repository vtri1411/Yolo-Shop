import React, { useState, useCallback } from 'react'

import { Link } from 'react-router-dom'

import Input from '../../components/AuthForm/Input'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'
import Marginer from '../../components/Marginer'
import Button from '../../components/Button'

import checkInput, { type } from '../../utilities/checkInput'
import { useEffect } from 'react'

const Register = () => {
	const [emailOrPhone, setEmailOrPhone] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [rePassword, setRePassword] = useState({ value: '', error: '' })

	const checkValidEmailOrPhone = useCallback(() => {
		setEmailOrPhone({
			...emailOrPhone,
			error: checkInput(emailOrPhone.value, type.emailOrPhone),
		})
	}, [emailOrPhone.value])

	const checkValidPassword = useCallback(() => {
		setPassword({
			...password,
			error: checkInput(password.value, type.password),
		})
	}, [password.value])

	const checkValidRePassword = useCallback(() => {
		setRePassword({
			...rePassword,
			error: checkInput(rePassword.value, type.repassword, password.value),
		})
	}, [rePassword.value, password.value, password.error])

	useEffect(() => {
		if (!password.error) {
			checkValidRePassword()
		}
	}, [password.value, password.error])

	return (
		<Helmet title='Đăng ký'>
			<div className='auth'>
				<h3 className='auth__title'>Đăng ký</h3>
				<form className='auth__form'>
					<div class='auth__form__group'>
						<label htmlFor='auth-id' className='auth__form__group__label'>
							Email hoặc số điện thoại
						</label>
						<Input
							type='text'
							id='auth-id'
							placeholder='Nhập email hoặc số điện thoại'
							value={emailOrPhone.value}
							error={emailOrPhone.error}
							onChange={(e) =>
								setEmailOrPhone({
									...emailOrPhone,
									value: e.target.value,
								})
							}
							onBlur={checkValidEmailOrPhone}
						/>
					</div>
					<div class='auth__form__group'>
						<label
							htmlFor='auth-password'
							className='auth__form__group__label'
						>
							Mật khẩu
						</label>
						<Input
							type='password'
							id='auth-password'
							placeholder='Nhập mật khẩu'
							value={password.value}
							error={password.error}
							onChange={(e) =>
								setPassword({ ...password, value: e.target.value })
							}
							onBlur={checkValidPassword}
						/>
					</div>
					<div class='auth__form__group'>
						<label
							htmlFor='auth-password'
							className='auth__form__group__label'
						>
							Nhập lại mật khẩu
						</label>
						<Input
							type='password'
							id='auth-password'
							placeholder='Nhập lại mật khẩu'
							value={rePassword.value}
							error={rePassword.error}
							onChange={(e) =>
								setRePassword({ ...rePassword, value: e.target.value })
							}
							onBlur={checkValidRePassword}
						/>
					</div>
					<Marginer margin='20px' />
					<Button>Đăng ký</Button>
				</form>
				<div class='auth__option'>
					<div class='auth__option'>
						<Link to='/recovery' className='auth__option__link'>
							Quên mật khẩu
						</Link>
					</div>
					<div class='auth__option'>
						<span class='auth__option__text'>Đã có tài khoản?</span>
						<Link to='/login' className='auth__option__link'>
							Đăng nhập
						</Link>
					</div>
				</div>
				<div class='auth__oauth3rd'></div>
			</div>
		</Helmet>
	)
}

export default Register
