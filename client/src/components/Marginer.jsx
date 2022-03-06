import React from 'react'

const Marginer = ({ direction, margin }) => {
	const style = {}
	let formatedMargin = 0

	if (typeof margin === 'number') {
		formatedMargin = `${margin}px`
	} else if (typeof margin === 'string') {
		formatedMargin = margin
	} else {
		formatedMargin = '20px'
	}

	if (direction === 'vertical') {
		style.width = formatedMargin
		style.height = '100%'
	} else {
		style.height = formatedMargin
		style.width = '100%'
	}

	return <div style={style}></div>
}

export default Marginer
