import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import { changeQuantity, deleteProduct } from '../redux/cart/cart.actions'

import numberWithCommas from '../utilities/numberWithCommas'

import Quantity from './Quantity'

const CartItem = ({ product }) => {
	const dispatch = useDispatch()

	const handleDeleteProduct = useCallback(() => {
		dispatch(deleteProduct({ inventoryId: product.inventoryId }))
	}, [product])

	return (
		<div className='cart__item'>
			<div className='cart__item__image'>
				<img src={product.images[0]} alt='' />
			</div>
			<div className='cart__item__info'>
				<div className='cart__item__info__name'>
					<Link to={`/product/${product.productId}`}>
						{`${product.name} - Màu ${product.color} - Size ${product.size}`}
					</Link>
				</div>
				<div className='cart__item__info__price'>
					{numberWithCommas(product.price)} đ
				</div>
				<div className='cart__item__info__quantity'>
					<Quantity
						quantity={product.quantity}
						handleChangeQuantity={(value) => {
							if (product.quantity + value < 1 && value < 0) {
								toast.dismiss()
								return toast.error(
									'Số lượng sản phẩm không được nhỏ hơn 1!'
								)
							}
							if (
								product.quantity + value > product.amount &&
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
									inventoryId: product.inventoryId,
								})
							)
						}}
					/>
				</div>
				<div
					className='cart__item__info__del'
					onClick={handleDeleteProduct}
				>
					<i className='bx bx-trash'></i>
				</div>
				{!product.isValid && (
					<div class='cart__item__info__error color-red'>
						<span class='cart__item__info__error__icon'>
							<i class='bx bx-error-circle'></i>
						</span>
						<span className='cart__item__info__error__text'>
							Số lượng sản phẩm vượt quá số lượng trong kho
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default CartItem
