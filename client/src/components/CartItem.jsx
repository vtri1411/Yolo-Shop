import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Quantity from './Quantity'

const CartItem = (props) => {
	const { item } = props
	return (
		<div className='cart__item'>
			<div className='cart__item__thumb'>
				<img src={item.product.image01} alt='' />
			</div>
			<div className='cart__item__info'>
				<div className='cart__item__info__title'>{item.product.title}</div>
				<div className='cart__item__info__price'>198,000</div>
				<Quantity quantity={1} />
				<div className='cart__item__info__del'>
					<i className='bx bx-trash'></i>
				</div>
			</div>
		</div>
	)
}

CartItem.propTypes = {}

export default CartItem
