import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setProductModal } from '../redux/product/product.actions'

// import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

const ProductCard = ({ name, images, price, _id }) => {
	const dispatch = useDispatch()
	const buyProduct = () => {
		dispatch(setProductModal(_id))
	}

	return (
		<div className='product-card'>
			<Link to={`/product/${_id}`}>
				<div className='product-card__img'>
					<img src={images?.[0]} alt='' className='product-card__img-1' />
					<img src={images?.[1]} alt='' className='product-card__img-2' />
				</div>
				<div className='product-card__info'>
					<div className='product-card__info__name'>{name}</div>
					<div className='product-card__info__price'>
						<span>{price}</span>
						<span className='old-price'>
							<del>3999999</del>
						</span>
					</div>
				</div>
			</Link>
			<div className='product-card__btn'>
				<Button
					size='sm'
					icon='bx bx-cart bx-tada'
					animate={true}
					onClick={buyProduct}
				>
					Chọn mua
				</Button>
			</div>
		</div>
	)
}

export default ProductCard
