import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Input from '../../components/AuthForm/Input'
import Button from '../../components/Button'
import Helmet from '../../components/Helmet'
import Marginer from '../../components/Marginer'

import checkInput, { type } from '../../utilities/checkInput'

const Recovery = () => {
	const [email, setEmail] = useState({ value: '', error: '' })

	const handleBlurEmail = useCallback(() => {
		setEmail({
			...email,
			error: checkInput(email.value, type.EMAIL),
		})
	}, [])

	return (
		<Helmet title='Đăng nhập'>
			<div className='auth'>
				<h3 className='auth__title'>Khôi phục mật khẩu</h3>
				<form className='auth__form'>
					<div className='auth__form__group'>
						<label
							htmlFor='login-id'
							className='auth__form__group__label'
						>
							Nhập email hoặc số điện thoại để khôi phục mật khẩu
						</label>
						<Input
							type='text'
							id='login-id'
							placeholder='Email hoặc số điện thoại'
							value={email.value}
							error={email.error}
							onChange={(e) =>
								setEmail({
									...email,
									value: e.target.value,
								})
							}
							onBlur={handleBlurEmail}
						/>
					</div>
					<Marginer margin='20px' />
					<Button>Lấy lại mật khẩu</Button>
				</form>
				<div className='auth__option'>
					<div className='auth__option'>
						<Link to='/login' className='auth__option__link'>
							Quay lại đăng nhập
						</Link>
					</div>
				</div>
				<div className='auth__oauth3rd'></div>
			</div>
		</Helmet>
	)
}

export default Recovery
