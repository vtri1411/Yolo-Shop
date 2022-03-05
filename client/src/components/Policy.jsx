import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../components/Grid'

import policy from '../assets/policy'

const Policy = () => {
	return (
		<Grid col={4} mdCol={2} smCol={1} gap={20}>
			{policy.map((item, index) => (
				<PolicyCard
					key={index}
					icon={item.icon}
					name={item.name}
					desc={item.description}
				/>
			))}
		</Grid>
	)
}

const PolicyCard = (props) => {
	return (
		<div className='policy-card'>
			<div className='policy-card__icon'>
				<i className={props.icon}></i>
			</div>
			<div className='policy-card__info'>
				<h4 className='policy-card__info__name'>{props.name}</h4>
				<div className='policy-card__info__desc'>{props.desc}</div>
			</div>
		</div>
	)
}

PolicyCard.propTypes = {
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
}

export default Policy
