import React, { useEffect, useState, useRef, useCallback } from 'react'

import logo from '../assets/images/Logo-2.png'
import emptyCartImg from '../assets/images/empty-cart.png'
import screenWidth from '../screenWidth'

import Button from './Button'

import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

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

const Header = (props) => {
	const headerRef = useRef(null)

	const [activeNav, setActiveNav] = useState(false)

	const { pathname } = useLocation()

	const isSmallScreen = useMediaQuery({ minWidth: screenWidth.sm })

	const [activeAuthPanel, setActiveAuthPanel] = useState(false)
	const [activeCartPanel, setActiveCartPanel] = useState(false)

	const handleClickAuth = useCallback(() => {
		setActiveAuthPanel((activeAuthPanel) => !activeAuthPanel)
	}, [activeAuthPanel])

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
						<div className='header__nav__item header__nav__icon header__nav__right__item header__nav__cart'>
							<Link to='/cart'>
								<i className='bx bx-shopping-bag'></i>
							</Link>
							<div class='header__nav__cart__panel'>
								{/* <div class='header__nav__cart__panel__empty'>
									<img src={emptyCartImg} alt='Empty Cart' />
								</div> */}
								<div class='header__nav__cart__panel__product'>
									<div class='header__nav__cart__panel__product__thumb'>
										<img src={emptyCartImg} />
									</div>
									<div class='header__nav__cart__panel__product__name'>
										<p>
											Sản phẩm 1 Lorem ipsum dolor sit amet
											consectetur, adipisicing elit. Praesentium,
											quibusdam.
										</p>
									</div>
									<div class='header__nav__cart__panel__product__quantity'>
										2
									</div>
								</div>
								<div class='header__nav__cart__panel__product'>
									<div class='header__nav__cart__panel__product__thumb'>
										<img src={emptyCartImg} />
									</div>
									<div class='header__nav__cart__panel__product__name'>
										<p>
											Sản phẩm 1 Lorem ipsum dolor sit amet
											consectetur, adipisicing elit. Praesentium,
											quibusdam.
										</p>
									</div>
									<div class='header__nav__cart__panel__product__quantity'>
										2
									</div>
								</div>
								<div class='header__nav__cart__panel__product'>
									<div class='header__nav__cart__panel__product__thumb'>
										<img src={emptyCartImg} />
									</div>
									<div class='header__nav__cart__panel__product__name'>
										<p>
											Sản phẩm 1 Lorem ipsum dolor sit amet
											consectetur, adipisicing elit. Praesentium,
											quibusdam.
										</p>
									</div>
									<div class='header__nav__cart__panel__product__quantity'>
										2
									</div>
								</div>
							</div>
						</div>
						<div
							className='header__nav__item header__nav__icon header__nav__right__item header__nav__auth'
							onClick={isSmallScreen ? handleClickAuth : null}
						>
							<div
								className={`header__nav__auth__panel ${
									activeAuthPanel ? 'active' : ''
								}`}
							>
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
							</div>
							<i className='bx bx-user'></i>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
