import React, { useState, useRef } from 'react'
import Helmet from '../components/Helmet'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import productColor from '../assets/fake-data/product-color'
import productSize from '../assets/fake-data/product-size'

import CustomCheckbox from '../components/CustomCheckbox'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import { useEffect } from 'react'
import Maginer from '../components/Marginer'

const Catalog = () => {
	const filterRef = useRef(null)

	const [activeFilter, setActiveFilter] = useState(false)

	const [products, setProducts] = useState(productData.getAllProducts())

	const initialFilter = {
		category: [],
		color: [],
		size: [],
	}
	const [filter, setFilter] = useState(initialFilter)

	const handleChangeFilter = (type, checked, value) => {
		if (checked) {
			switch (type) {
				case 'CATEGORY':
					setFilter({ ...filter, category: [...filter.category, value] })
					break
				case 'COLOR':
					setFilter({ ...filter, color: [...filter.color, value] })
					break
				case 'SIZE':
					setFilter({ ...filter, size: [...filter.size, value] })
					break
				default:
					throw new Error()
			}
		} else {
			switch (type) {
				case 'CATEGORY':
					setFilter({
						...filter,
						category: filter.category.filter((item) => item !== value),
					})
					break
				case 'COLOR':
					setFilter({
						...filter,
						color: filter.color.filter((item) => item !== value),
					})
					break
				case 'SIZE':
					setFilter({
						...filter,
						size: filter.size.filter((item) => item !== value),
					})
					break
				default:
					throw new Error()
			}
		}
	}

	const handleResetFilter = () => {
		setFilter(initialFilter)
	}

	useEffect(() => {
		let productsTemp = productData.getAllProducts()
		if (filter.category.length > 0) {
			productsTemp = productsTemp.filter((item) =>
				filter.category.some((cate) => cate === item.categorySlug)
			)
		}
		if (filter.color.length > 0) {
			productsTemp = productsTemp.filter((item) =>
				filter.color.some((color) => item.colors.some((e) => e === color))
			)
		}
		if (filter.size.length > 0) {
			productsTemp = productsTemp.filter((item) =>
				filter.size.some((size) => item.size.some((e) => e === size))
			)
		}
		setProducts(productsTemp)
	}, [filter])

	useEffect(() => {
		if (activeFilter) {
			filterRef.current.classList.add('active')
		} else {
			filterRef.current.classList.remove('active')
		}
	}, [activeFilter])

	return (
		<Helmet title='Danh mục'>
			<div className='catalog'>
				<div className='catalog__filter' ref={filterRef}>
					<div className='catalog__filter__widget'>
						<div
							className='catalog__filter__close'
							onClick={() => setActiveFilter(false)}
						>
							<i className='bx bx-left-arrow-alt'></i>
						</div>
					</div>
					<div className='catalog__filter__widget'>
						<div className='catalog__filter__widget__title'>
							<h3>Danh mục sản phẩm</h3>
						</div>
						{category.map((item, index) => (
							<div key={index} className='catalog__filter__widget__item'>
								<CustomCheckbox
									label={item.display}
									checked={filter.category.some(
										(e) => e === item.categorySlug
									)}
									onChange={(input) =>
										handleChangeFilter(
											'CATEGORY',
											input.checked,
											item.categorySlug
										)
									}
								/>
							</div>
						))}
					</div>
					<div className='catalog__filter__widget'>
						<div className='catalog__filter__widget__title'>
							<h3>Màu sắc</h3>
						</div>
						{productColor.map((item, index) => (
							<div key={index} className='catalog__filter__widget__item'>
								<CustomCheckbox
									label={item.display}
									checked={filter.color.some((e) => e === item.color)}
									onChange={(input) =>
										handleChangeFilter(
											'COLOR',
											input.checked,
											item.color
										)
									}
								/>
							</div>
						))}
					</div>
					<div className='catalog__filter__widget'>
						<div className='catalog__filter__widget__title'>
							<h3>Size</h3>
						</div>
						{productSize.map((item, index) => (
							<div key={index} className='catalog__filter__widget__item'>
								<CustomCheckbox
									label={item.display}
									checked={filter.size.some((e) => e === item.size)}
									onChange={(input) =>
										handleChangeFilter(
											'SIZE',
											input.checked,
											item.size
										)
									}
								/>
							</div>
						))}
					</div>
					<div className='catalog__filter__widget'>
						<Button onClick={handleResetFilter}>Xóa bộ lọc</Button>
					</div>
				</div>
				<div className='catalog__filter__toggle'>
					<Button onClick={() => setActiveFilter(true)}>Bộ lọc</Button>
				</div>
				<div className='catalog__product'>
					<InfinityList data={products} />
				</div>
			</div>
			<Maginer />
		</Helmet>
	)
}

export default Catalog
