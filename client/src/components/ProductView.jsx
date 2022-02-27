import React, { useEffect, useState } from 'react'

import Button from '../components/Button'
import Quantity from '../components/Quantity'

const ProductView = (props) => {
	const product = props.product

	const [mainImg, setMainImg] = useState('')

	const [color, setColor] = useState('')

	const [size, setSize] = useState('')

	const [quantity, setQuantity] = useState(1)

	const [expandDesc, setExpandDesc] = useState(false)

	useEffect(() => {
		setMainImg(product.image01)
		setColor('')
		setSize('')
		setQuantity(1)
		setExpandDesc(false)
	}, [product])

	const handleChangeQuantity = (type, value) => {
		if (type === '+') {
			setQuantity(quantity + value)
		} else if (type === '-') {
			setQuantity(quantity - value < 1 ? quantity : quantity - value)
		}
	}

	const check = () => {
		if (color === '') return false
		if (size === '') return false
		if (quantity < 1) return false
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
							onClick={() => setMainImg(product.image01)}
						>
							<img
								src={product.image01}
								className={mainImg === product.image01 ? 'active' : ''}
								alt=''
							/>
						</div>
						<div
							className='product__imgs__list__item'
							onClick={() => setMainImg(product.image02)}
						>
							<img
								src={product.image02}
								className={mainImg === product.image02 ? 'active' : ''}
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
						{product.colors.map((item, index) => (
							<div
								key={index}
								className={`product__info__item__list__item ${
									color === item ? 'active' : ''
								}`}
								onClick={() => setColor(item)}
							>
								<div className={`circle bg-${item}`}></div>
							</div>
						))}
					</div>
				</div>
				<div className='product__info__item'>
					<div className='product__info__item__title'>Kích cỡ</div>
					<div className='product__info__item__list'>
						{product.size.map((item, index) => (
							<div
								key={index}
								className={`product__info__item__list__item ${
									size === item ? 'active' : ''
								}`}
								onClick={() => setSize(item)}
							>
								<span className='size'>{item}</span>
							</div>
						))}
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
