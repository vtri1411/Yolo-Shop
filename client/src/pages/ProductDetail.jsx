import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProductById } from '../redux/product/product.actions'

import Helmet from '../components/Helmet'
import Maginer from '../components/Marginer'
import ProductView from '../components/ProductView'
import ProductList from '../components/ProductList'

const mapState = ({ product }) => ({ product: product.productDetail })

const ProductDetail = () => {
	const dispatch = useDispatch()

	const { product } = useSelector(mapState)

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			dispatch(getProductById(id))
		}
	}, [id])

	return (
		<Helmet title='Sản phẩm'>
			{product && <ProductView product={product} />}
			<Maginer />
			{/* <ProductList
				items={productData.getProducts(4)}
				title='Khám phá thêm'
			/> */}
			<Maginer />
		</Helmet>
	)
}

export default ProductDetail
