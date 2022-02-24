import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

const ProductCard = (props) => {
	const dispatch = useDispatch()
	const buyProduct = () => {
		dispatch(set(props.slug))
	}

	return (
		<div className='product-card'>
			<Link to={`catalog/${props.slug}`}>
				<div className='product-card__img'>
					<img
						src={props.image01}
						alt=''
						className='product-card__img-1'
					/>
					<img
						src={props.image02}
						alt=''
						className='product-card__img-2'
					/>
				</div>
				<div className='product-card__info'>
					<div className='product-card__info__name'>{props.title}</div>
					<div className='product-card__info__price'>
						<span>{props.price}</span>
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

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	image01: PropTypes.string,
	image02: PropTypes.string,
	price: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired
}

export default ProductCard
