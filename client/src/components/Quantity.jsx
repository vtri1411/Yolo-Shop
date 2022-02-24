import React from 'react'
import PropTypes from 'prop-types'

const Quantity = (props) => {
	return (
		<div className='quantity'>
			<div
				className='quantity__btn'
				onClick={() => props.handleChangeQuantity('-', 1)}
			>
				<i className='bx bx-minus'></i>
			</div>
			<div className='quantity__input'>{props.quantity}</div>
			<div
				className='quantity__btn'
				onClick={() => props.handleChangeQuantity('+', 1)}
			>
				<i className='bx bx-plus'></i>
			</div>
		</div>
	)
}

Quantity.propTypes = {
	handleChangeQuantity: PropTypes.func.isRequired,
	quantity: PropTypes.number.isRequired
}

export default Quantity
