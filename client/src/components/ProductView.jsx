import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import { addProduct } from '../redux/cart/cart.actions'
import { setShowProductModal } from '../redux/product/product.actions'

import Button from '../components/Button'
import Quantity from '../components/Quantity'
import numberWithCommas from '../utilities/numberWithCommas'

const mapState = ({ user }) => ({ user: user.user })
const ProductView = ({ product, isModal }) => {
	const dispatch = useDispatch()

	const { user } = useSelector(mapState)

	const history = useHistory()

	const [mainImg, setMainImg] = useState(product.images[0].url)

	const [color, setColor] = useState({ id: '', name: '' })

	const [size, setSize] = useState({ id: '', name: '' })

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
				if (!color.id || item.color.id === color.id) {
					// Check if tempSize have already had this size
					if (
						tempSizes.length === 0 ||
						!tempSizes.some((tempSize) => tempSize.id === item.size.id)
					) {
						tempSizes.push(item.size)
					}
				}

				if (!size.id || item.size.id === size.id) {
					if (
						tempColors.length === 0 ||
						!tempColors.some((tempColor) => tempColor.id === item.color.id)
					) {
						tempColors.push(item.color)
					}
				}
			})
		}
		return { productColors: tempColors, productSizes: tempSizes }
	}, [product, size, color])

	const handleChangeQuantity = (value) => {
		if (color.id === '') {
			toast.dismiss()
			toast.error('Vui l??ng ch???n m??u s???c tr?????c!')
			return false
		}
		if (size.id === '') {
			toast.dismiss()
			toast.error('Vui l??ng ch???n size tr?????c!')
			return false
		}

		if (quantity + value < 1) {
			toast.dismiss()
			return toast.error('S??? l?????ng kh??ng ???????c nh??? h??n 1!')
		}

		if (quantity + value > amount) {
			toast.dismiss()
			return toast.error('S??? l?????ng s???n ph???m trong kho kh??ng ?????!')
		}

		setQuantity(quantity + value)
	}

	const check = () => {
		if (!user) {
			toast.dismiss()
			toast.error('Vui l??ng ????ng nh???p!')
			return false
		}

		if (color.id === '') {
			toast.dismiss()
			toast.error('Vui l??ng ch???n m??u s???c!')
			return false
		}
		if (size.id === '') {
			toast.dismiss()
			toast.error('Vui l??ng ch???n size!')
			return false
		}
		if (quantity < 1) {
			toast.dismiss()
			toast.error('Vui l??ng ch???n s??? l?????ng h???p l???!')
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
				(item) => item.colorId === color.id && item.sizeId === size.id
			)
			dispatch(addProduct({ inventoryId: inventory.id, quantity }))
			dispatch(setShowProductModal())
		}
	}

	useEffect(() => {
		setQuantity(1)
	}, [color, size])

	// When user choose size and color
	// Loop through inventories to find which user choose
	// Get amount in stock of that product and display it
	useEffect(() => {
		if (!color.id || !size.id) {
			setAmount(-1)
		} else {
			const temp = product.inventories.find(
				(item) => item.color.id === color.id && item.size.id === size.id
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
					<h4 className='product__desc__title'>Chi ti???t s???n ph???m</h4>
					<p
						className={`product__desc__content  ${expandDesc ? 'active' : ''}`}
						dangerouslySetInnerHTML={{ __html: product.description }}
					></p>
					<div className='product__desc__btn'>
						<Button onClick={() => setExpandDesc(!expandDesc)}>
							{expandDesc ? 'Thu g???n' : 'Xem Th??m'}
						</Button>
					</div>
				</div>
			</div>
			<div className={`product__info ${isModal ? 'modal' : ''}`}>
				<h2 className='product__info__name'>{product.name}</h2>

				<div className='product__info__item'>
					<div className='product__info__item__title'>T??nh tr???ng: </div>
					<div
						className={`product__info__item__text ${
							product.available ? '' : 'error'
						}`}
					>
						{product.available ? 'C??n h??ng' : 'H???t h??ng'}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Gi?? ti???n: </div>
					<span className='product__info__item__text'>
						{numberWithCommas(product.price)}
						<span> ??</span>
					</span>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Lo???i: </div>
					<span className='product__info__item__text'>
						{product.category.name}
					</span>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Th????ng hi???u: </div>
					<span className='product__info__item__text'>
						{product.brand.name}
					</span>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>
						M??u s???c:
						<span className='product__info__item__desc'>
							{color.name ? color.name : '--'}
						</span>
					</div>
					<div className='product__info__item__list'>
						{Array.isArray(productColors) &&
							productColors.map((item) => (
								<div
									key={item.id}
									className={`product__info__item__list__item ${
										color.id === item.id ? 'active' : ''
									}`}
									// If currently chosing this color, click this color
									// again will cancel choosing it
									onClick={() =>
										color.id === item.id
											? setColor({ id: '', name: '' })
											: setColor({ id: item.id, name: item.name })
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
					<div className='product__info__item__title'>
						K??ch c???:
						<span className='product__info__item__desc'>
							{size.name ? size.name : '--'}
						</span>
					</div>
					<div className='product__info__item__list'>
						{Array.isArray(productSizes) &&
							productSizes.map((item) => (
								<div
									key={item.id}
									className={`product__info__item__list__item ${
										size.id === item.id ? 'active' : ''
									}`}
									onClick={() =>
										size.id === item.id
											? setSize({ id: '', name: '' })
											: setSize({ id: item.id, name: item.name })
									}
								>
									<span className='size'>{item.name}</span>
								</div>
							))}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>S??? l?????ng: </div>
					<Quantity
						quantity={quantity}
						handleChangeQuantity={handleChangeQuantity}
					/>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>C??n l???i trong kho:</div>
					<div className='product__info__item__text minor'>
						{amount > 0 ? amount : '--'}
						<span> {product.unit}</span>
					</div>
				</div>
				<div className='product__info__btn'>
					<Button onClick={handleBuyProduct}>Mua ngay</Button>
					<Button onClick={handleAddProduct}>Th??m v??o gi??? h??ng</Button>
				</div>
			</div>

			<div className={`product__desc mobile`}>
				<h4 className='product__desc__title'>Chi ti???t s???n ph???m</h4>
				<p
					className={`product__desc__content  ${expandDesc ? 'active' : ''}`}
					dangerouslySetInnerHTML={{ __html: product.description }}
				></p>
				<div className='product__desc__btn'>
					<Button onClick={() => setExpandDesc(!expandDesc)}>
						{expandDesc ? 'Thu g???n' : 'Xem Th??m'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductView
