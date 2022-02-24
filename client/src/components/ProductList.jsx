import React from 'react'
import PropTypes from 'prop-types'

import Section, { SectionBody, SectionTitle } from './Section'
import ProductCard from './ProductCard'
import Grid from './Grid'

const ProductList = (props) => {
	return (
		<Section>
			{props.title && <SectionTitle>{props.title}</SectionTitle>}
			<SectionBody>
				<Grid col={4} mdCol={2} smCol={1} gap={10} rowGap={20}>
					{props.items.map((item) => (
						<ProductCard
							key={item.slug}
							slug={item.slug}
							title={item.title}
							image01={item.image01}
							image02={item.image02}
							price={item.price}
						/>
					))}
				</Grid>
			</SectionBody>
		</Section>
	)
}

ProductList.propTypes = {
	items: PropTypes.array.isRequired,
	title: PropTypes.string
}

export default ProductList
