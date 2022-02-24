import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

const Cart = () => {
	const cartProducts = useSelector((state) => state.shoppingCart.value)

	return (
		<div className='cart'>
			<div className='cart__info'>
				<div className='cart__info__txt'>
					<div className='cart__info__count'>
						Bạn có {3} sản phẩm trong giỏ hàng
					</div>
					<div className='cart__info__price'>
						<span>Thành tiền</span>
						<span className=''>577,000</span>
					</div>
				</div>
				<div className='cart__info__btn'>
					<Button>Đặt hàng</Button>
					<Button>Tiếp tục mua hàng</Button>
				</div>
			</div>
			<div className='cart__list'>
				
			</div>
		</div>
	)
}

export default Cart
