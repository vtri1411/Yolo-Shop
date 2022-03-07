import React from 'react'
import notFoundImg from '../assets/images/notFound.jpg'

const NotFound = () => {
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<img src={notFoundImg} alt='' style={{ maxWidth: '100%' }} />
		</div>
	)
}

export default NotFound
