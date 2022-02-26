import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { reSendVerificationEmail } from '../../redux/user/user.actions'

const mapState = ({ user }) => ({
	email: user?.verification?.email,
	isSent: user?.verification?.isSent,
})

const ShowVerification = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const { email, isSent } = useSelector(mapState)

	const handleClickReSendEmail = () => {
		if (!isSent) {
			dispatch(reSendVerificationEmail(email))
		} else {
			toast('Đã gửi mail xác nhận, vui lòng kiểm tra email của bạn!')
		}
	}

	useEffect(() => {
		if (!email) {
			history.push('/')
		}
	}, [email])

	return (
		<div className='show-verification'>
			<div className='show-verification__text'>
				Email chưa được xác minh, một mail xác minh đã được gửi vào {email},
				vui lòng kiểm tra email của bạn!
			</div>

			<br />

			<div className='show-verification__text'>
				Nếu không thấy mail,{' '}
				<span
					className={`show-verification__link ${isSent ? 'disabled' : ''}`}
					onClick={handleClickReSendEmail}
				>
					nhấn vào đây để gửi lại!
				</span>
			</div>
		</div>
	)
}

export default ShowVerification
