import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { useMediaQuery } from 'react-responsive'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'

import screenWidth from '../screenWidth'

import { logOutUser } from '../redux/user/user.actions'
import { changeQuantity, deleteProduct } from '../redux/cart/cart.actions'

import logo from '../assets/images/Logo-2.png'
import emptyCartImg from '../assets/images/empty-cart.png'
import blankAvt from '../assets/images/blank_avt.png'

import Button from './Button'
import Quantity from './Quantity'

const nav = [
	{
		display: 'Trang chủ',
		path: '/',
	},
	{
		display: 'Sản phẩm',
		path: '/catalog',
	},
	{
		display: 'Phụ kiện',
		path: '/accessories',
	},
	{
		display: 'Liên hệ',
		path: '/contact',
	},
]

const mapState = ({ user, cart }) => ({
	user: user.user,
	isLoading: user.isLoading,
	cart: cart.cart,
})

const Header = (props) => {
	const dispatch = useDispatch()

	const history = useHistory()

	const headerRef = useRef(null)

	const [activeNav, setActiveNav] = useState(false)

	const { pathname } = useLocation()

	const { user, isLoading, cart } = useSelector(mapState)

	const isSmallScreen = useMediaQuery({ maxWidth: screenWidth.sm })

	const [activeAuthPanel, setActiveAuthPanel] = useState(false)

	const handleClickAuth = useCallback(() => {
		if (isSmallScreen) {
			setActiveAuthPanel(!activeAuthPanel)
		}
	}, [activeAuthPanel, isSmallScreen])

	const handleClickLogOut = useCallback(() => {
		dispatch(logOutUser(history))
	}, [])

	const handleRemoveCart = (inventoryId) => {
		dispatch(deleteProduct({ inventoryId }))
	}

	useEffect(() => {
		const shrinkHeader = () => {
			if (window.scrollY >= 50) {
				headerRef?.current?.classList.add('shrink')
			} else {
				headerRef?.current?.classList.remove('shrink')
			}
		}
		window.addEventListener('scroll', shrinkHeader)
		return () => {
			window.removeEventListener('scroll', shrinkHeader)
		}
	}, [])

	return (
		<header className='header' ref={headerRef}>
			<div className='container'>
				<div className='header__logo'>
					<img src={logo} alt='' />
				</div>
				<div className='header__nav'>
					<div
						className='header__nav__mobile-toggle header__nav__icon'
						onClick={() => setActiveNav(true)}
					>
						<i className='bx bx-menu-alt-left'></i>
					</div>
					<div
						className={`header__nav__left ${activeNav ? 'active' : ''}`}
					>
						<div
							className='header__nav__left__close header__nav__icon'
							onClick={() => setActiveNav(false)}
						>
							<i className='bx bx-chevron-left'></i>
						</div>
						{nav.map((item, index) => (
							<div
								key={index}
								className={`header__nav__item header__nav__left__item 
                        ${pathname === item.path ? 'active' : ''}`}
							>
								<Link
									to={item.path}
									onClick={() => setActiveNav(false)}
								>
									{item.display}
								</Link>
							</div>
						))}
					</div>
					<div className='header__nav__right'>
						<div className='header__nav__item header__nav__icon header__nav__right__item'>
							<Link to='/catalog'>
								<i className='bx bx-search'></i>
							</Link>
						</div>
						<div className='header__nav__item header__nav__icon header__nav__right__item header__nav__cart '>
							<Link className='header__nav__cart__link' to='/cart'>
								<i className='bx bx-shopping-bag'></i>
								{Array.isArray(cart) && (
									<div className='header__nav__cart__link__badge'>
										{cart.length}
									</div>
								)}
							</Link>
							{Array.isArray(cart) && (
								<div
									className={`header__nav__cart__panel ${
										isSmallScreen ? 'hidden' : ''
									}`}
								>
									<div className='header__nav__cart__panel__wrapper'>
										{cart.length > 0 ? (
											cart.map((item) => (
												<div
													key={item.inventoryId}
													className='header__nav__cart__panel__product'
												>
													<div className='header__nav__cart__panel__product__thumb'>
														<Link
															to={`/product/${item.productId}`}
														>
															<img src={item.images[0]} alt='' />
														</Link>
													</div>
													<div className='header__nav__cart__panel__product__name'>
														<Link
															to={`/product/${item.productId}`}
														>
															{item.name}
														</Link>
													</div>
													<div className='header__nav__cart__panel__product__quantity'>
														<Quantity
															handleChangeQuantity={(value) => {
																if (
																	item.quantity + value < 1 &&
																	value < 0
																) {
																	toast.dismiss()
																	return toast.error(
																		'Số lượng sản phẩm không được nhỏ hơn 1!'
																	)
																}
																if (
																	item.quantity + value >
																		item.amount &&
																	value > 0
																) {
																	toast.dismiss()
																	return toast.error(
																		'Số lượng sản phẩm vượt quá số lượng trong kho!'
																	)
																}
																dispatch(
																	changeQuantity({
																		quantity: value,
																		inventoryId:
																			item.inventoryId,
																	})
																)
															}}
															quantity={item.quantity}
															size='sm'
														/>
													</div>
													<div
														className='header__nav__cart__panel__product__remove'
														onClick={() =>
															handleRemoveCart(item.inventoryId)
														}
													>
														<i className='bx bx-trash'></i>
													</div>
												</div>
											))
										) : (
											<div className='header__nav__cart__panel__empty'>
												<img src={emptyCartImg} alt='Empty Cart' />
											</div>
										)}
									</div>
								</div>
							)}
						</div>
						<div
							className={`header__nav__item header__nav__icon header__nav__right__item header__nav__auth ${
								activeAuthPanel ? 'active' : ''
							}`}
							onClick={handleClickAuth}
						>
							<div className='header__nav__auth__panel'>
								{!isLoading && user ? (
									<>
										<Button
											size='sm'
											className='header__nav__auth__panel__btn'
										>
											<Link to='/user/profile'>
												<p className='header__nav__auth__panel__btn__text'>
													Tài khoản của tôi
												</p>
											</Link>
										</Button>
										<Button
											size='sm'
											className='header__nav__auth__panel__btn'
											onClick={handleClickLogOut}
										>
											<p className='header__nav__auth__panel__btn__text'>
												Đăng xuất
											</p>
										</Button>
									</>
								) : (
									<>
										<Button
											size='sm'
											className='header__nav__auth__panel__btn'
										>
											<Link
												to={'/register'}
												className='header__nav__auth__panel__btn__text'
											>
												Đăng ký
											</Link>
										</Button>
										<Button
											size='sm'
											className='header__nav__auth__panel__btn'
										>
											<Link
												to={'/login'}
												className='header__nav__auth__panel__btn__text'
											>
												Đăng nhập
											</Link>
										</Button>
									</>
								)}
							</div>

							{isLoading ? (
								<ReactLoading
									type='spin'
									color='#ccc'
									height={30}
									width={30}
								/>
							) : user ? (
								<div className='header__nav__auth__avatar'>
									<img
										src={user.avatar ? user.avatar : blankAvt}
										alt=''
									/>
								</div>
							) : (
								<i className='bx bx-user'></i>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
