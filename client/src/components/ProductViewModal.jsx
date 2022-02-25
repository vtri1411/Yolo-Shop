import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import productData from '../assets/fake-data/products'

// import { remove } from '../redux/product-modal/productModalSlice'

import ProductView from './ProductView'
import Button from './Button'

const ProductViewModal = (props) => {
	const dispatch = useDispatch()

	const product = productData.getProductBySlug()

	return (
		<div className={`product-view__modal ${product ? 'active' : ''}`}>
			<div className='product-view__modal__content'>
				<div className='product-view__modal__content__btn'>
					<Button
						size='sm'
						// onClick={() => dispatch(remove())}
					>
						Đóng
					</Button>
				</div>
				{product && <ProductView product={product} />}
			</div>
		</div>
	)
}

export default ProductViewModal
