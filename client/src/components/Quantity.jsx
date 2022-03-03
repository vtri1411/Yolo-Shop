import React from 'react'

const Quantity = ({ handleChangeQuantity, quantity, size }) => {
	return (
		<div className='quantity'>
			<div
				className={`quantity__btn ${size === 'sm' ? 'sm' : ''}`}
				onClick={() => handleChangeQuantity(-1)}
			>
				<i className='bx bx-minus'></i>
			</div>
			<div className={`quantity__input ${size === 'sm' ? 'sm' : ''}`}>
				{quantity}
			</div>
			<div
				className={`quantity__btn ${size === 'sm' ? 'sm' : ''}`}
				onClick={() => handleChangeQuantity(1)}
			>
				<i className='bx bx-plus'></i>
			</div>
		</div>
	)
}

export default Quantity
