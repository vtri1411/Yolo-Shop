import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import ReactLoading from 'react-loading'

import logo from '../assets/images/Logo-2.png'
import emptyCartImg from '../assets/images/empty-cart.png'
import blankAvt from '../assets/images/blank_avt.png'
import screenWidth from '../screenWidth'

import Button from './Button'
import Quantity from './Quantity'
import { logOutUser } from '../redux/user/user.actions'

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

const mapState = ({ user }) => ({ user: user.user, isLoading: user.isLoading })

const Header = (props) => {
	const dispatch = useDispatch()

	const headerRef = useRef(null)

	const [activeNav, setActiveNav] = useState(false)

	const { pathname } = useLocation()

	const { user, isLoading } = useSelector(mapState)

	const isSmallScreen = useMediaQuery({ maxWidth: screenWidth.sm })

	const [activeAuthPanel, setActiveAuthPanel] = useState(false)

	const handleClickAuth = useCallback(() => {
		if (isSmallScreen) {
			setActiveAuthPanel(!activeAuthPanel)
		}
	}, [activeAuthPanel, isSmallScreen])

	const handleClickLogOut = useCallback(() => {
		dispatch(logOutUser())
	}, [dispatch])

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
							<i className='bx bx-search'></i>
						</div>
						<div className='header__nav__item header__nav__icon header__nav__right__item header__nav__cart '>
							<Link to='/cart'>
								<i className='bx bx-shopping-bag'></i>
							</Link>
							<div
								className={`header__nav__cart__panel ${
									isSmallScreen ? 'hidden' : ''
								}`}
							>
								<div className='header__nav__cart__panel__wrapper'>
									{/* <div className='header__nav__cart__panel__empty'>
									<img src={emptyCartImg} alt='Empty Cart' />
								</div> */}
									<div className='header__nav__cart__panel__product'>
										<div className='header__nav__cart__panel__product__thumb'>
											<Link to='/'>
												<img src={emptyCartImg} alt='' />
											</Link>
										</div>
										<div className='header__nav__cart__panel__product__name'>
											<Link to={`/`}>
												Sản phẩm 1 Lorem ipsum dolor sit amet
												consectetur, adipisicing elit. Praesentium,
												quibusdam.
											</Link>
										</div>
										<div className='header__nav__cart__panel__product__quantity'>
											<Quantity
												handleChangeQuantity={() => {}}
												quantity={1}
												size='sm'
											/>
										</div>
										<div className='header__nav__cart__panel__product__remove'>
											<i className='bx bx-trash'></i>
										</div>
									</div>
								</div>
							</div>
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
									<img src={user.avatar ? user.avatar : blankAvt}  alt=''/>
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
