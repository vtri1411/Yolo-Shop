import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import UserForm from '../../components/User/UserForm'
import UserFormGroup from '../../components/User/UserFormGroup'
import { changePassword } from '../../redux/user/user.actions'
import validateInput, { TYPE } from '../../utilities/validateInput'

const mapState = ({ user }) => ({ user: user.user })
const ChangePassword = () => {
	const dispatch = useDispatch()

	const { user } = useSelector(mapState)

	const [newPassword, setNewPassword] = useState({ value: '', error: '' })
	const [reNewPassword, setReNewPassword] = useState({ value: '', error: '' })

	const validateNewPassword = () => {
		const error = validateInput(newPassword.value, TYPE.PASSWORD)
		setNewPassword({
			...newPassword,
			error,
		})
		return error
	}
	const validateReNewPassword = () => {
		const error = validateInput(
			reNewPassword.value,
			[TYPE.PASSWORD, TYPE.REPASSWORD],
			newPassword.value
		)
		setReNewPassword({
			...reNewPassword,
			error,
		})
		return error
	}

	const handleChangePassword = (e) => {
		e.preventDefault()
		dispatch(changePassword({ newPassword: newPassword.value }))
	}

	useEffect(() => {
		if (
			!newPassword.error &&
			newPassword.value !== '' &&
			reNewPassword.value !== ''
		) {
			validateReNewPassword()
		}
	}, [newPassword.error, reNewPassword.value, newPassword.value])

	return (
		<div className='user__content__wrapper'>
			<div className='user__content__title'>
				<div className='user__content__title__text'>Mật khẩu</div>
				<div className='user__content__title__desc'>
					Quản lý thông tin hồ sơ để bảo mật tài khoản s.skjsakjasbj
				</div>
			</div>
			<div className='user__content__password'>
				<div className='user__content__password__wrapper'>
					<UserForm onSubmit={handleChangePassword}>
						<UserFormGroup
							label='Mật khẩu mới:'
							type='password'
							value={newPassword.value}
							onChange={(e) =>
								setNewPassword({
									...newPassword,
									value: e.target.value,
								})
							}
							onBlur={validateNewPassword}
							error={newPassword.error}
						/>
						<UserFormGroup
							label='Nhập lại mật khẩu mới:'
							type='password'
							value={reNewPassword.value}
							onChange={(e) =>
								setReNewPassword({
									...reNewPassword,
									value: e.target.value,
								})
							}
							onBlur={validateReNewPassword}
							error={reNewPassword.error}
						/>
						<div className='user__content__password__btn'>
							<Button>Đổi mật khẩu</Button>
						</div>
					</UserForm>
				</div>
			</div>
		</div>
	)
}

export default ChangePassword
