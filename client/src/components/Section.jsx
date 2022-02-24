import React from 'react'

const Section = (props) => {
	return <section className='section'>{props.children}</section>
}

export const SectionTitle = (props) => {
	return <h2 className='section__title'>{props.children}</h2>
}

export const SectionBody = (props) => {
	return <div className='section__body'>{props.children}</div>
}

export default Section
