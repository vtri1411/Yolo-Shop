import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import Button from '../components/Button'
import Quantity from '../components/Quantity'
import { addProduct } from '../redux/cart/cart.actions'
import { getProductById } from '../redux/product/product.actions'
import numberWithCommas from '../utilities/numberWithCommas'

const ProductView = ({ product, isModal }) => {
	const dispatch = useDispatch()

	const history = useHistory()

	const [mainImg, setMainImg] = useState(product.images[0].url)

	const [color, setColor] = useState('')

	const [size, setSize] = useState('')

	const [amount, setAmount] = useState(-1)

	const [quantity, setQuantity] = useState(1)

	const [expandDesc, setExpandDesc] = useState(false)

	// Bc inventory is array, each item is {size, color, amount}
	// So this func to get all different color of this product
	const { productColors, productSizes } = useMemo(() => {
		const tempColors = []
		const tempSizes = []
		if (Array.isArray(product.inventories)) {
			product.inventories.forEach((item) => {
				// If there is no color, or this elem of inventory
				// has this color, so add size to tempSize
				if (!color || item.color.id === color) {
					// Check if tempSize have already had this size
					if (
						tempSizes.length === 0 ||
						!tempSizes.some((tempSize) => tempSize.id === item.size.id)
					) {
						tempSizes.push(item.size)
					}
				}

				if (!size || item.size.id === size) {
					if (
						tempColors.length === 0 ||
						!tempColors.some(
							(tempColor) => tempColor.id === item.color.id
						)
					) {
						tempColors.push(item.color)
					}
				}
			})
		}
		return { productColors: tempColors, productSizes: tempSizes }
	}, [product, size, color])

	const handleChangeQuantity = (value) => {
		if (color === '') {
			toast.error('Vui lòng chọn màu sắc trước!')
			return false
		}
		if (size === '') {
			toast.error('Vui lòng chọn size trước!')
			return false
		}

		setQuantity(
			quantity + value < amount && quantity + value > 0
				? quantity + value
				: quantity
		)
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

	const handleBuyProduct = () => {
		if (check()) {
			handleAddProduct()
			history.push('/cart')
		}
	}

	const handleAddProduct = () => {
		if (check()) {
			const inventory = product.inventories.find(
				(item) => item.colorId === color && item.sizeId === size
			)
			dispatch(addProduct({ inventoryId: inventory.id, quantity }))
		}
	}

	// When user choose size and color
	// Loop through inventories to find which user choose
	// Get amount in stock of that product and display it
	useEffect(() => {
		if (!color || !size) {
			setAmount(-1)
		} else {
			const temp = product.inventories.find(
				(item) => item.color.id === color && item.size.id === size
			)
			setAmount(temp.amount)
		}
	}, [color, product, size])

	return (
		<div className='product'>
			<div className='product__imgs'>
				<div className='product__imgs__wrap'>
					<div className='product__imgs__list'>
						{Array.isArray(product.images) &&
							product.images.map((item) => (
								<div
									key={item.id}
									className='product__imgs__list__item'
									onClick={() => setMainImg(item.url)}
								>
									<img
										src={item.url}
										className={mainImg === item.url ? 'active' : ''}
										alt=''
									/>
								</div>
							))}
					</div>
					<div className='product__imgs__main'>
						<img src={mainImg} alt='' />
					</div>
				</div>
				<div className={`product__desc`}>
					<h4 className='product__desc__title'>Chi tiết sản phẩm</h4>
					<p
						className={`product__desc__content  ${
							expandDesc ? 'active' : ''
						}`}
						dangerouslySetInnerHTML={{ __html: product.description }}
					></p>
					<div className='product__desc__btn'>
						<Button onClick={() => setExpandDesc(!expandDesc)}>
							{expandDesc ? 'Thu gọn' : 'Xem Thêm'}
						</Button>
					</div>
				</div>
			</div>
			<div className={`product__info ${isModal ? 'modal' : ''}`}>
				<h2 className='product__info__name'>{product.name}</h2>

				<div className='product__info__item'>
					<div className='product__info__item__title'>Tình trạng: </div>
					<div
						className={`product__info__item__text ${
							product.available ? '' : 'error'
						}`}
					>
						{product.available ? 'Còn hàng' : 'Hết hàng'}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Giá tiền</div>
					<span className='product__info__item__text'>
						{numberWithCommas(product.price)}
						<span> đ</span>
					</span>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Màu sắc</div>
					<div className='product__info__item__list'>
						{Array.isArray(productColors) &&
							productColors.map((item) => (
								<div
									key={item.id}
									className={`product__info__item__list__item ${
										color === item.id ? 'active' : ''
									}`}
									// If currently chosing this color, click this color
									// again will cancel choosing it
									onClick={() =>
										color === item.id
											? setColor('')
											: setColor(item.id)
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
									key={item.id}
									className={`product__info__item__list__item ${
										size === item.id ? 'active' : ''
									}`}
									onClick={() =>
										size === item.id ? setSize('') : setSize(item.id)
									}
								>
									<span className='size'>{item.name}</span>
								</div>
							))}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Số lượng</div>
					<Quantity
						quantity={quantity}
						handleChangeQuantity={handleChangeQuantity}
					/>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>
						Còn lại trong kho
					</div>
					<div className='product__info__item__text minor'>
						{amount > 0 ? amount : '--'}
						<span> {product.unit}</span>
					</div>
				</div>
				<div className='product__info__btn'>
					<Button onClick={handleBuyProduct}>Mua ngay</Button>
					<Button onClick={handleAddProduct}>Thêm vào giỏ hàng</Button>
				</div>
			</div>

			<div className={`product__desc mobile`}>
				<h4 className='product__desc__title'>Chi tiết sản phẩm</h4>
				<p
					className={`product__desc__content  ${
						expandDesc ? 'active' : ''
					}`}
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
