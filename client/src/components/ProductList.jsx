import React from 'react'
import PropTypes from 'prop-types'

import Section, { SectionBody, SectionTitle } from './Section'
import ProductCard from './ProductCard'
import Grid from './Grid'

const ProductList = ({ title, products }) => {
	return (
		<Section>
			{title && <SectionTitle>{title}</SectionTitle>}
			<SectionBody>
				<Grid col={4} mdCol={2} smCol={1} gap={10} rowGap={20}>
					{products?.map((item) => (
						<ProductCard
							key={item._id}
							id={item._id}
							name={item.name}
							images={item.images}
							price={item.price}
						/>
					))}
				</Grid>
			</SectionBody>
		</Section>
	)
}

export default ProductList
