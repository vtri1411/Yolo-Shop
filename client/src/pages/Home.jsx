import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

import Helmet from '../components/Helmet'
import HeroSlide from '../components/HeroSlide'
import Policy from '../components/Policy'
import Maginer from '../components/Marginer'
import ProductList from '../components/ProductList'
import Banner from '../components/Banner'

const mapState = ({ product }) => ({ products: product.products })

const Home = () => {
	const { products } = useSelector(mapState)

	return (
		<Helmet title='Home'>
			<HeroSlide />
			<Policy />
			<Maginer margin={40} />
			<ProductList products={products} title='Top sản phẩm bán chạy' />
			<Maginer margin={40} />
			<Maginer margin={40} />
			<Banner />
			<Maginer margin={40} />
			<Maginer margin={40} />
		</Helmet>
	)
}

export default Home
