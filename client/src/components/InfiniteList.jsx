import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import { getProducts } from '../redux/product/product.actions'
import Grid from './Grid'
import ProductCard from './ProductCard'

const mapState = ({ product }) => ({ products: product.products })
const InfinityList = ({ filter, sort, keyword }) => {
	const dispatch = useDispatch()

	// const { products } = useSelector(mapState)
	const [products, setProducts] = useState([])

	const listRef = useRef(null)

	const [shouldLoad, setShouldLoad] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [page, setPage] = useState(1)

	const [isLastPage, setIsLastPage] = useState(false)

	const [idToRefresh, setIdToRefresh] = useState('')

	const loadProduct = async (id) => {
		if (!isLoading && !isLastPage) {
			setShouldLoad(false)
			setIsLoading(true)

			try {
				const { data } = await axios.post('/api/product/filter', {
					filter,
					keyword,
					sort,
					limit: 8,
					offset: 8 * (page - 1),
				})

				setIsLoading(false)

				if (data.status === 'SUCCESS') {
					setProducts([...products, ...data.payload])
					setPage(page + 1)

					if (data.payload.length === 0) {
						setIsLastPage(true)
					}
				} else {
					toast.error('Load product failed!')
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	// Add eventlistener when reach bottom
	useEffect(() => {
		const goLoad = () => {
			if (listRef && listRef.current) {
				if (
					window.scrollY + window.innerHeight >=
					listRef.current.offsetTop + listRef.current.clientHeight + 200
				) {
					setShouldLoad(false)
					setShouldLoad(true)
				}
			}
		}
		window.addEventListener('scroll', goLoad)
		return () => {
			window.removeEventListener('scroll', goLoad)
		}
	}, [])

	useEffect(() => {
		if (shouldLoad) loadProduct()
	}, [shouldLoad])

	useEffect(() => {
		setProducts([])
		setPage(1)
		setIsLastPage(false)
	}, [filter, keyword, sort])

	useEffect(() => {
		if (page === 1) {
			loadProduct()
		}
	}, [page])

	return (
		<div ref={listRef}>
			<Grid col={3} mdCol={2} smCol={1} rowGap={30} gap={10}>
				{products &&
					products.map((item) => (
						<ProductCard
							key={item.id}
							id={item.id}
							name={item.name}
							images={item.images}
							price={item.price}
						/>
					))}
			</Grid>
			<div
				style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}
			>
				{isLoading && <h1>Đang load . . .</h1>}
				{isLastPage && <h1>Trang cuối</h1>}
			</div>
		</div>
	)
}

export default React.memo(InfinityList)
