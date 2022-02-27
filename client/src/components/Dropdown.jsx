import React, { useState } from 'react'

const Dropdown = ({ options, value, onChange, defaultDisplay }) => {
	const [isActive, setIsActive] = useState(false)

	const [displayText, setDisplayText] = useState('')

	return (
		<div className={`dropdown ${isActive ? 'active' : ''}`}>
			<div className='dropdown__btn' onClick={() => setIsActive(!isActive)}>
				<div className='dropdown__btn__text'>
					{displayText ? displayText : defaultDisplay}
				</div>
				<div className='dropdown__btn__icon'>
					<i className='bx bxs-down-arrow'></i>
				</div>
			</div>
			<div className={`dropdown__content`}>
				{Array.isArray(options) &&
					options.map((item) => (
						<div
							key={item.value}
							className='dropdown__content__item'
							onClick={() => {
								onChange(item.value)
								setDisplayText(item.display)
								setIsActive(false)
							}}
						>
							{item.display}
						</div>
					))}
			</div>
		</div>
	)
}

export default React.memo(Dropdown)
