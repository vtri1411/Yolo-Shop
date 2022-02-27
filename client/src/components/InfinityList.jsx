import React, { useState, useEffect, useRef } from 'react'
import Grid from './Grid'
import ProductCard from './ProductCard'

const InfinityList = ({ products }) => {
	const listRef = useRef(null)

	// const [products, setProducts] = useState([])

	// const [load, setLoad] = useState(true)

	// const [index, setIndex] = useState(0)

	// const productPerPage = 6

	// // Set product when reach bottom
	// useEffect(() => {
	// 	const totalPage = Math.ceil(props.data.length / productPerPage)

	// 	if (load && index < totalPage) {
	// 		const start = productPerPage * index
	// 		const end = start + productPerPage
	// 		setProducts([...products, ...props.data.slice(start, end)])
	// 		setIndex(index + 1)
	// 	}

	// 	setLoad(false)
	// }, [load, index, products, props.data])

	// // Add eventlistener when reach bottom
	// useEffect(() => {
	// 	const loadProduct = () => {
	// 		if (listRef && listRef.current) {
	// 			if (
	// 				window.scrollY + window.innerHeight >=
	// 				listRef.current.offsetTop + listRef.current.clientHeight + 200
	// 			) {
	// 				setLoad(true)
	// 			}
	// 		}
	// 	}

	// 	window.addEventListener('scroll', loadProduct)

	// 	return () => {
	// 		window.removeEventListener('scroll', loadProduct)
	// 	}
	// }, [])

	// // Set state when data change
	// useEffect(() => {
	// 	setProducts(props.data.slice(0, productPerPage))
	// 	setIndex(1)
	// 	setLoad(false)
	// }, [props.data])

	return (
		<div ref={listRef}>
			<Grid col={3} mdCol={2} smCol={1} rowGap={30} gap={10}>
				{products &&
					products.map((item) => (
						<ProductCard
							key={item._id}
							id={item._id}
							name={item.name}
							images={item.images}
							price={item.price}
						/>
					))}
			</Grid>
		</div>
	)
}

export default InfinityList
