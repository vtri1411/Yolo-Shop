import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

import Marginer from '../Marginer'

const checkValid = (type, value) => {
	switch (type) {
		case 'emailOrPhone':
			if (/^[\d]+$/.test(value)) {
				if (value.length === 10) return ''
				return 'Số điện thoại phải là 10 chữ số !'
			}

			if (/\w+@\w+\.\w+/.test(value)) {
				return ''
			} else {
				return 'Email nhập không hợp lệ !'
			}

		case 'password':
			if (value.length < 6) return 'Mật khẩu ít nhất 6 ký tự !'
			return ''
	}
}

const AuthFormModal = () => {
	const [emailOrPhone, setEmailOrPhone] = useState('')
	const [password, setPassword] = useState('')
	const [repassword, setRepassword] = useState('')

	const [error, setError] = useState({
		emailOrPhone: '',
		password: '',
		repassword: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		if (checkEmailOrPhoneError() && checkPasswordError()) {
			alert('right')
		} else {
			alert('false')
		}
	}

	const checkEmailOrPhoneError = useCallback(() => {
		setError({
			...error,
			emailOrPhone: checkValid('emailOrPhone', emailOrPhone),
		})
		return false
	}, [emailOrPhone])

	const checkPasswordError = useCallback(() => {
		setError({ ...error, password: checkValid('password', password) })
		return false
	}, [password])

	return (
		<div className='auth-form__modal'>
			<form class='auth-form__modal__wrapper' onSubmit={handleSubmit}>
				<div class='auth-form__modal__title'>
					<h5>Đăng nhập</h5>
				</div>
				<Marginer margin={60} />
				<EmailOrPhoneInput
					value={emailOrPhone}
					error={error.emailOrPhone}
					onChange={(e) => setEmailOrPhone(e.target.value)}
					onBlur={checkEmailOrPhoneError}
				/>
				<Marginer margin={40} />
				<PasswordInput
					value={password}
					error={error.password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={checkPasswordError}
				/>
				<Marginer margin={40} />
				<button className='auth-form__modal__button'>Đăng nhập</button>
				<Marginer margin={20} />
				<span class='auth-form__modal__forget-password'>
					Quên mật khẩu?
				</span>
				<Marginer margin={20} />
				<span class='auth-form__modal__register'>
					Chưa có tài khoản? <span>Đăng ký</span>
				</span>
			</form>
		</div>
	)
}

const EmailOrPhoneInput = ({ value, error, onBlur, onChange }) => {
	return (
		<div className='auth-form__modal__input__email-phone'>
			<input
				type='text'
				value={value}
				onChange={onChange}
				spellCheck={false}
				onBlur={onBlur}
			/>
			<label>Email hoặc số điện thoại</label>
			{error !== '' && (
				<div class='auth-form__modal__input__error'>
					<i class='bx bxs-error-circle'></i> {error}
				</div>
			)}
		</div>
	)
}

const PasswordInput = ({ value, error, onChange, onBlur }) => {
	const [isSeePassword, setIsSeePassword] = useState(false)

	return (
		<div className='auth-form__modal__input__password'>
			<input
				type={isSeePassword ? 'text' : 'password'}
				value={value}
				onChange={onChange}
				spellCheck={false}
				onBlur={onBlur}
			/>
			<label>Mật khẩu</label>
			<div
				class='auth-form__modal__input__password-toggle'
				onClick={() => setIsSeePassword(!isSeePassword)}
			>
				<i class='bx bx-low-vision'></i>
			</div>
			{error !== '' && (
				<div class='auth-form__modal__input__error'>
					<i class='bx bxs-error-circle'></i> {error}
				</div>
			)}
		</div>
	)
}

export default AuthFormModal
