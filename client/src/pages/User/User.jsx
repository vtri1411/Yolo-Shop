import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import blankAvatar from '../../assets/images/blank_avt.png'

import Helmet from '../../components/Helmet'

import ChangePassword from './ChangePassword'
import OrderDetail from './OrderDetail'
import OrderHistory from './OrderHistory'

import UserProfile from './UserProfile'

const mapState = ({ user }) => ({ user: user.user })
const User = () => {
	const { slug } = useParams()

	const { user } = useSelector(mapState)

	const [isOpen, setIsOpen] = useState(false)

	return (
		<Helmet title='Hồ sơ của tôi'>
			<div className={`user`}>
				<div className={`user__sidebar ${isOpen ? 'open' : ''}`}>
					<div
						className='user__sidebar__hide-mobile'
						onClick={() => setIsOpen(false)}
					>
						<i className='bx bx-left-arrow-alt'></i>
					</div>
					<div className='user__sidebar__widget'>
						<div className='user__sidebar__avatar'>
							<img
								src={user.avatar ? user.avatar : blankAvatar}
								alt=''
							/>
						</div>
						<div className='user__sidebar__info'>
							<div className='user__sidebar__info__name'>
								{user.name ? user.name : user.email}
							</div>
							<div className='user__sidebar__info__edit'>
								<Link to={'/user/profile'}>
									<i className=' bx bx-edit-alt'></i>
									Sửa Hồ Sơ
								</Link>
							</div>
						</div>
					</div>
					<div className='user__sidebar__list'>
						<Link
							to='/user/profile'
							className={`user__sidebar__list__item ${
								slug === 'profile' ? 'active' : ''
							}`}
						>
							Hồ sơ của tôi
						</Link>

						<Link
							to='/user/password'
							className={`user__sidebar__list__item ${
								slug === 'password' ? 'active' : ''
							}`}
						>
							<i className='bx bx-lock'></i>
							Đổi mật khẩu
						</Link>

						<Link
							to='/user/order-history'
							className={`user__sidebar__list__item ${
								slug === 'order-history' ? 'active' : ''
							}`}
						>
							<i className='bx bx-history'></i>
							Lịch sử mua hàng
						</Link>
						<Link
							to='/user/order-detail'
							className={`user__sidebar__list__item ${
								slug === 'order-detail' ? 'active' : ''
							}`}
						>
							<i className='bx bx-history'></i>
							Chi tiết mua hàng
						</Link>
					</div>
				</div>
				<div className='user__open-mobile' onClick={() => setIsOpen(true)}>
					<i className='bx bx-menu'></i>
				</div>
				<div className='user__content'>
					{slug === 'profile' && <UserProfile />}
					{slug === 'password' && <ChangePassword />}
					{slug === 'order-history' && <OrderHistory />}
					{slug === 'order-detail' && <OrderDetail />}
				</div>
			</div>
		</Helmet>
	)
}

export default User
