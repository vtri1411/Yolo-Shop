import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { reSendVerificationEmail } from '../../redux/user/user.actions'

import validateInput, { TYPE } from '../../utilities/validateInput'

import Helmet from '../../components/Helmet'
import AuthContainer from '../../components/Auth/AuthContainer'
import AuthForm from '../../components/Auth/AuthForm'
import AuthFormGroup from '../../components/Auth/AuthFormGroup'
import Button from '../../components/Button'
import Marginer from '../../components/Marginer'

const mapState = ({ user }) => ({
	isSent: user?.verification?.isSent,
})
const ShowVerification = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const { isSent } = useSelector(mapState)

	const [email, setEmail] = useState({ value: '', error: '' })

	const validateEmail = useCallback(() => {
		const error = validateInput(email.value, TYPE.EMAIL)
		console.log({ error })
		setEmail({
			...email,
			error,
		})
		return error
	}, [email.value])

	const handleClickReSendEmail = (e) => {
		e.preventDefault()

		if (validateEmail(email.value, TYPE.EMAIL)) {
			return toast.error('Vui lòng nhập email hợp lệ !')
		}

		dispatch(reSendVerificationEmail(email.value))
	}

	return (
		<Helmet title='Xác nhận'>
			<AuthContainer title={'Gửi lại mã xác nhận'}>
				<AuthForm onSubmit={handleClickReSendEmail}>
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

					<Button>Gửi lại mã xác nhận</Button>
				</AuthForm>
			</AuthContainer>
		</Helmet>
	)
}

export default ShowVerification
