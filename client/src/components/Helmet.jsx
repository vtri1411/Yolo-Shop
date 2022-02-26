import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Helmet = (props) => {
	useEffect(() => {
		window.scrollTo(0, 0)
		document.title = 'Yolo - ' + props.title
	}, [props.title])

	return props.children
}

Helmet.propTypes = {
	title: PropTypes.string.isRequired,
}

export default Helmet
