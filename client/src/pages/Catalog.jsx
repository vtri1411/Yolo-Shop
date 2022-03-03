import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	filterProducts,
	getAllProducts,
} from '../redux/product/product.actions'

import Helmet from '../components/Helmet'
import CustomCheckbox from '../components/CustomCheckbox'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import Maginer from '../components/Marginer'
import ProductList from '../components/ProductList'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'

const filterType = {
	CATEGORY: 'CATEGORY',
	COLOR: 'COLOR',
	SIZE: 'SIZE',
	BRAND: 'BRAND',
}

const mapState = ({ product, category, brand, size, color }) => ({
	products: product.products,
	categories: category.categories,
	colors: color.colors,
	brands: brand.brands,
	sizes: size.sizes,
})

const selectOption = [
	{ value: 'NEWEST', display: 'Mới nhất' },
	{ value: 'OLDEST', display: 'Cũ nhất' },
	{ value: 'PRICE_ASC', display: 'Giá thấp tới cao' },
	{ value: 'PRICE_DESC', display: 'Giá cao tới thấp' },
]

const Catalog = () => {
	const dispatch = useDispatch()

	const filterRef = useRef(null)

	const { products, brands, categories, colors, sizes } = useSelector(mapState)

	const [activeFilter, setActiveFilter] = useState(false)

	const initialFilter = {
		category: [],
		color: [],
		size: [],
		brand: [],
	}
	const [filter, setFilter] = useState(initialFilter)

	const [keyword, setKeyword] = useState('')

	const [sort, setSort] = useState('')

	const handleSetCheckFilter = (id, type) => {
		switch (type) {
			case filterType.BRAND:
				return filter.brand.some((item) => item === id)
			case filterType.CATEGORY:
				return filter.category.some((item) => item === id)
			case filterType.COLOR:
				return filter.color.some((item) => item === id)
			case filterType.SIZE:
				return filter.size.some((item) => item === id)
			default:
				throw new Error('Filter type not exist')
		}
	}

	const handleChangeFilter = (type, checked, value) => {
		if (checked) {
			switch (type) {
				case filterType.CATEGORY:
					setFilter({ ...filter, category: [...filter.category, value] })
					break
				case filterType.COLOR:
					setFilter({ ...filter, color: [...filter.color, value] })
					break
				case filterType.SIZE:
					setFilter({ ...filter, size: [...filter.size, value] })
					break
				case filterType.BRAND:
					setFilter({ ...filter, brand: [...filter.brand, value] })
					break
				default:
					throw new Error()
			}
		} else {
			switch (type) {
				case filterType.CATEGORY:
					setFilter({
						...filter,
						category: filter.category.filter((item) => item !== value),
					})
					break
				case filterType.COLOR:
					setFilter({
						...filter,
						color: filter.color.filter((item) => item !== value),
					})
					break
				case filterType.SIZE:
					setFilter({
						...filter,
						size: filter.size.filter((item) => item !== value),
					})
					break
				case filterType.BRAND:
					setFilter({
						...filter,
						brand: filter.brand.filter((item) => item !== value),
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

	const handleFilter = (e) => {
		e.preventDefault()

		dispatch(filterProducts({ filter, keyword, sort }))
	}

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
							<h3>Từ khoá</h3>
						</div>
						<div className='catalog__filter__input'>
							<Input
								type={'text'}
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
								placeholder={'Nhập từ khoá'}
							/>
						</div>
					</div>

					<div className='catalog__filter__widget'>
						<div className='catalog__filter__widget__title'>
							<h3>Sắp xếp</h3>
						</div>

						<Dropdown
							defaultDisplay='Sắp xếp theo'
							options={selectOption}
							onChange={setSort}
						/>
					</div>

					<FilterWidget
						list={brands}
						title='Thương hiệu'
						handleSetCheckFilter={handleSetCheckFilter}
						type={filterType.BRAND}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterWidget
						list={categories}
						title='Danh mục'
						handleSetCheckFilter={handleSetCheckFilter}
						type={filterType.CATEGORY}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterWidget
						list={colors}
						title='Màu sắc'
						handleSetCheckFilter={handleSetCheckFilter}
						type={filterType.COLOR}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterWidget
						list={sizes}
						title='Size'
						handleSetCheckFilter={handleSetCheckFilter}
						type={filterType.SIZE}
						handleChangeFilter={handleChangeFilter}
					/>

					<div className='catalog__filter__widget'>
						<Button onClick={handleFilter}>Xác nhận</Button>
					</div>

					<div className='catalog__filter__widget'>
						<Button onClick={handleResetFilter}>Xóa bộ lọc</Button>
					</div>
				</div>
				<div className='catalog__filter__toggle'>
					<Button onClick={() => setActiveFilter(true)}>Bộ lọc</Button>
				</div>
				<div className='catalog__product'>
					<InfinityList products={products} />
					{/* <ProductList /> */}
				</div>
			</div>
			<Maginer />
		</Helmet>
	)
}

const FilterWidget = ({
	list,
	title,
	handleChangeFilter,
	handleSetCheckFilter,
	type,
}) => {
	return (
		<div className='catalog__filter__widget'>
			<div className='catalog__filter__widget__title'>
				<h3>{title}</h3>
			</div>
			<div class='catalog__filter__widget__list'>
				{list?.map((item) => (
					<div
						key={item.id}
						className='catalog__filter__widget__list__item'
					>
						<CustomCheckbox
							label={item.name}
							checked={handleSetCheckFilter(item.id, type)}
							onChange={(e) =>
								handleChangeFilter(type, e.target.checked, item.id)
							}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Catalog
