import React from 'react'

import Section, { SectionBody, SectionTitle } from './Section'
import ProductCard from './ProductCard'
import Grid from './Grid'

const ProductList = ({ title, products }) => {
	return (
		<Section>
			{title && <SectionTitle>{title}</SectionTitle>}
			<SectionBody>
				<Grid col={4} mdCol={2} smCol={1} gap={30} rowGap={20}>
					{products?.map((item) => (
						<ProductCard
							key={item.id}
							id={item.id}
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
