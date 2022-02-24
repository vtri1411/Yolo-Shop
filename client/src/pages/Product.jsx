import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import productData from '../assets/fake-data/products'

import Helmet from '../components/Helmet'
import Maginer from '../components/Marginer'
import ProductView from '../components/ProductView'
import ProductList from '../components/ProductList'

const Product = (props) => {
	const { slug } = useParams()

	const [product, setProduct] = useState(null)

	useEffect(() => {
		setProduct(productData.getProductBySlug(slug))
	}, [slug])

	return (
		<Helmet title='Sản phẩm'>
			{product && <ProductView product={product} />}
			<Maginer />
			<ProductList
				items={productData.getProducts(4)}
				title='Khám phá thêm'
			/>
			<Maginer />
		</Helmet>
	)
}

export default Product
