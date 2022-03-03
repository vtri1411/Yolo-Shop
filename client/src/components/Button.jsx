import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
	const size = props.size ? `btn-${props.size}` : ''

	const animate = props.animate ? 'btn-animate' : ''

	return (
		<button
			className={`btn ${size} ${animate} ${
				props.className ? props.className : ''
			}`}
			onClick={props.onClick ? props.onClick : null}
			style={props.style}
		>
			{props.icon && (
				<span className='btn__icon'>
					<i className={props.icon}></i>
				</span>
			)}
			<span className='btn__txt'>{props.children}</span>
		</button>
	)
}

Button.propTypes = {
	size: PropTypes.string,
	animate: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func,
}

export default Button
