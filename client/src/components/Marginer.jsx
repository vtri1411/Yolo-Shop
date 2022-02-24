import React from 'react'
import PropTypes from 'prop-types'

const Maginer = (props) => {
	if (props.direction === 'vertical') {
		return (
			<div
				style={{
					height: '100%',
					width: `${
						typeof props.margin === 'number'
							? `${props.margin}px`
							: props.margin
					}`,
				}}
			></div>
		)
	} else {
		return (
			<div
				style={{
					width: '100%',
					height: `${
						typeof props.margin === 'number'
							? `${props.margin}px`
							: props.margin
					}`,
				}}
			></div>
		)
	}
}

export default Maginer
