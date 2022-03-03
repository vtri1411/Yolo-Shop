import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setShowProductModal } from '../redux/product/product.actions'

import ProductView from './ProductView'
import Button from './Button'
import ReactLoading from 'react-loading'

const mapState = ({ product }) => ({
	productModal: product.productModal,
	isShowProductModal: product.isShowProductModal,
	isLoadingProductModal: product.isLoadingProductModal,
})

const ProductViewModal = (props) => {
	const dispatch = useDispatch()

	const { isLoadingProductModal, isShowProductModal, productModal } =
		useSelector(mapState)

	return (
		<div
			className={`product-view__modal ${isShowProductModal ? 'active' : ''}`}
		>
			<div className='product-view__modal__content'>
				<div className='product-view__modal__content__btn'>
					<Button
						size='sm'
						onClick={() => dispatch(setShowProductModal(false))}
					>
						Đóng
					</Button>
				</div>
				{isLoadingProductModal ? (
					<div class='product-view__modal__content__loading'>
						<ReactLoading
							type='bars'
							color='#4267b2'
							width={'20%'}
							height={'10%'}
						/>
					</div>
				) : (
					productModal && <ProductView product={productModal} isModal />
				)}
			</div>
		</div>
	)
}

export default ProductViewModal
