import React from 'react'

import productData from '../assets/fake-data/products'

import Helmet from '../components/Helmet'
import HeroSlide from '../components/HeroSlide'
import Policy from '../components/Policy'
import Maginer from '../components/Marginer'
import ProductList from '../components/ProductList'
import Banner from '../components/Banner'

const Home = () => {
	return (
		<Helmet title='Home'>
			<HeroSlide />
			<Policy />
			<Maginer margin={40} />
			<ProductList
				items={productData.getProducts(4)}
				title='Top sản phẩm bán chạy'
			/>
			<Maginer margin={40} />
			<ProductList
				items={productData.getProducts(8)}
				title='Sản phẩm mới nhất'
			/>
			<Maginer margin={40} />
			<Banner />
			<Maginer margin={40} />
			<ProductList items={productData.getProducts(8)} title='Phổ biến' />
			<Maginer margin={40} />
		</Helmet>
	)
}

export default Home
