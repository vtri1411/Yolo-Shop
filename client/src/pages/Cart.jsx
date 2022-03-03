import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '../components/Button'

import CartItem from '../components/CartItem'
import Helmet from '../components/Helmet'
import numberWithCommas from '../utilities/numberWithCommas'

const mapState = ({ cart }) => ({ cart: cart.cart })

const Cart = () => {
	const { cart } = useSelector(mapState)

	return (
		<Helmet title='Giỏ hàng'>
			<div className='cart'>
				<div className='cart__info'>
					<div className='cart__info__txt'>
						<div className='cart__info__txt__count'>
							Bạn có {Array.isArray(cart) ? cart.length : 0} sản phẩm
							trong giỏ hàng
						</div>
						<div className='cart__info__txt__price'>
							<span>Thành tiền: </span>
							<span>
								{Array.isArray(cart)
									? numberWithCommas(
											cart.reduce(
												(accumulator, item) =>
													accumulator + item.quantity * item.price,
												0
											)
									  )
									: 0}
							</span>
						</div>
					</div>
					<div className='cart__info__btn'>
						<Button className='cart__info__btn__item'>Đặt hàng</Button>
						<Link to='/'>
							<Button className='cart__info__btn__item'>
								Tiếp tục mua hàng
							</Button>
						</Link>
					</div>
				</div>
				<div className='cart__list'>
					{Array.isArray(cart) &&
						cart.map((item) => (
							<CartItem key={item.inventoryId} product={item} />
						))}
				</div>
			</div>
		</Helmet>
	)
}

export default Cart
