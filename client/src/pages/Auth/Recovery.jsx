import React, { useCallback, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import checkInput, { TYPE } from '../../utilities/validateInput'

import { requestResetPassword } from '../../redux/user/user.actions'

import { toast } from 'react-toastify'

import Helmet from '../../components/Helmet'
import AuthContainer from '../../components/Auth/AuthContainer'
import AuthFormGroup from '../../components/Auth/AuthFormGroup'
import AuthForm from '../../components/Auth/AuthForm'
import Button from '../../components/Button'
import Marginer from '../../components/Marginer'

const Recovery = () => {
	const history = useHistory()

	const dispatch = useDispatch()

	const [email, setEmail] = useState({ value: '', error: '' })

	const validateEmail = useCallback(() => {
		setEmail({
			...email,
			error: checkInput(email.value, TYPE.EMAIL),
		})
	}, [email.value])

	const handleRequestResetPassword = (e) => {
		e.preventDefault()

		if (!!validateEmail()) {
			return toast.error('Vui lòng nhập đầy đủ thông tin hợp lệ !')
		}

		dispatch(
			requestResetPassword({
				email: email.value,
			})
		)
	}

	return (
		<Helmet title='Quên mật khẩu'>
			<AuthContainer title={'Quên mật khẩu'}>
				<AuthForm onSubmit={handleRequestResetPassword}>
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

					<Marginer margin={20} />

					<Button>Đặt lại mật khẩu</Button>
				</AuthForm>

				<div className='auth__link'>
					<div className='auth__link__item'>
						<Link to='/login' className='auth__link__item__link'>
							Quay lại đăng nhập
						</Link>
					</div>
				</div>
			</AuthContainer>
		</Helmet>
	)
}

export default Recovery
