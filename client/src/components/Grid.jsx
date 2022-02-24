import React from 'react'
import PropTypes from 'prop-types'

const Grid = (props) => {
	let rowGap = props.rowGap ? props.rowGap : props.gap ? props.gap : 0
	let colGap = props.colGap ? props.colGap : props.gap ? props.gap : 0

	const style = {
		gap: `${rowGap}px ${colGap}px`
	}

	const col = `grid-col-${props.col}`
	const mdCol = `grid-col-md-${props.mdCol}`
	const smCol = `grid-col-sm-${props.smCol}`

	return (
		<div className={`grid ${col} ${mdCol} ${smCol}`} style={style}>
			{props.children}
		</div>
	)
}

Grid.propTypes = {
	col: PropTypes.number.isRequired,
	lgCol: PropTypes.number,
	mdCol: PropTypes.number,
	smCol: PropTypes.number,
	gap: PropTypes.number,
	rowGap: PropTypes.number,
	colGap: PropTypes.number
}

export default Grid
