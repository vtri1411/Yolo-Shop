import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import Button from '../components/Button'
import Quantity from '../components/Quantity'
import { getProductById } from '../redux/product/product.actions'

const mapState = ({ color }) => ({ colors: color.colors })

const ProductView = ({ product }) => {
	const { colors } = useSelector(mapState)

	const [mainImg, setMainImg] = useState(product.images[0])

	const [color, setColor] = useState('')

	const [size, setSize] = useState('')

	const [quantity, setQuantity] = useState(1)

	const [expandDesc, setExpandDesc] = useState(false)

	// Bc inventory is array, each item is {size, color, amount}
	// So this func to get all different color of this product
	const { productColors, productSizes } = useMemo(() => {
		const tempColors = []
		const tempSizes = []
		if (Array.isArray(product.inventory)) {
			product.inventory.forEach((item) => {
				if (!color || item.color._id === color) {
					if (!tempSizes.includes(item.size._id)) {
						tempSizes.push(item.size)
					}
				}

				if (!size || item.size._id === size) {
					if (!tempSizes.includes(item.color._id)) {
						tempColors.push(item.color)
					}
				}
			})
		}
		return { productColors: tempColors, productSizes: tempSizes }
	}, [product, size, color])

	const handleChangeQuantity = (type, value) => {
		if (type === '+') {
			setQuantity(quantity + value)
		} else if (type === '-') {
			setQuantity(quantity - value < 1 ? quantity : quantity - value)
		}
	}

	const check = () => {
		if (color === '') {
			toast.error('Vui lòng chọn màu sắc!')
			return false
		}
		if (size === '') {
			toast.error('Vui lòng chọn size!')
			return false
		}
		if (quantity < 1) {
			toast.error('Vui lòng chọn số lượng hợp lệ!')
			return false
		}
		return true
	}

	const goToCart = () => {
		if (check()) {
			console.log('ok go cart')
		} else {
			console.log('err go cart')
		}
	}

	const addToCart = () => {
		if (check()) {
			console.log('ok add cart')
		} else {
			console.log('err add cart')
		}
	}

	return (
		<div className='product'>
			<div className='product__imgs'>
				<div className='product__imgs__wrap'>
					<div className='product__imgs__list'>
						<div
							className='product__imgs__list__item'
							onClick={() => setMainImg(product.images[0])}
						>
							<img
								src={product.images[0]}
								className={
									mainImg === product.images[0] ? 'active' : ''
								}
								alt=''
							/>
						</div>
						<div
							className='product__imgs__list__item'
							onClick={() => setMainImg(product.images[1])}
						>
							<img
								src={product.images[1]}
								className={
									mainImg === product.images[1] ? 'active' : ''
								}
								alt=''
							/>
						</div>
					</div>
					<div className='product__imgs__main'>
						<img src={mainImg} alt='' />
					</div>
				</div>
				<div className={`product__desc ${expandDesc ? 'active' : ''}`}>
					<h4 className='product__desc__title'>Chi tiết sản phẩm</h4>
					<p
						className='product__desc__content'
						dangerouslySetInnerHTML={{ __html: product.description }}
					></p>
					<div className='product__desc__btn'>
						<Button onClick={() => setExpandDesc(!expandDesc)}>
							{expandDesc ? 'Thu gọn' : 'Xem Thêm'}
						</Button>
					</div>
				</div>
			</div>
			<div className='product__info'>
				<h2 className='product__info__name'>Áo thun</h2>

				<div className='product__info__item'>
					<div className='product__info__item__title'>Màu sắc</div>
					<div className='product__info__item__list'>
						{Array.isArray(productColors) &&
							productColors.map((item) => (
								<div
									key={item._id}
									className={`product__info__item__list__item ${
										color === item._id ? 'active' : ''
									}`}
									onClick={() =>
										color === item._id
											? setColor('')
											: setColor(item._id)
									}
								>
									<div
										className={`circle`}
										style={{ backgroundColor: `${item.hex}` }}
									></div>
								</div>
							))}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Kích cỡ</div>
					<div className='product__info__item__list'>
						{Array.isArray(productSizes) &&
							productSizes.map((item) => (
								<div
									key={item._id}
									className={`product__info__item__list__item ${
										size === item._id ? 'active' : ''
									}`}
									onClick={() =>
										size === item._id
											? setSize('')
											: setSize(item._id)
									}
								>
									<span className='size'>{item.name}</span>
								</div>
							))}
						{/* {product.size.map((item, index) => (
							<div
								key={index}
								className={`product__info__item__list__item ${
									size === item ? 'active' : ''
								}`}
								onClick={() => setSize(item)}
							>
								<span className='size'>{item}</span>
							</div>
						))} */}
					</div>
				</div>
				<div className='product__info__item'>
					<span className='product__info__price'>189,000</span>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Số lượng</div>
					<Quantity
						quantity={quantity}
						handleChangeQuantity={handleChangeQuantity}
					/>
				</div>
				<div className='product__info__btn'>
					<Button onClick={goToCart}>Mua ngay</Button>
					<Button onClick={addToCart}>Thêm vào giỏ hàng</Button>
				</div>
			</div>
			<div className={`product__desc mobile ${expandDesc ? 'active' : ''}`}>
				<h4 className='product__desc__title'>Chi tiết sản phẩm</h4>
				<p
					className='product__desc__content'
					dangerouslySetInnerHTML={{ __html: product.description }}
				></p>
				<div className='product__desc__btn'>
					<Button onClick={() => setExpandDesc(!expandDesc)}>
						{expandDesc ? 'Thu gọn' : 'Xem Thêm'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductView
