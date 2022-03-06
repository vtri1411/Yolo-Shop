import React from 'react'

import SwiperCore, { Autoplay } from 'swiper/'
import { Swiper, SwiperSlide } from 'swiper/react'

import heroSlideData from '../assets/slider/hero-slider'

import Button from './Button'

SwiperCore.use([Autoplay])

const HeroSlide = () => {
	return (
		<div className='hero-slide'>
			<Swiper
				slidesPerView={1}
				grabCursor={true}
				loop={true}
				autoplay={{
					delay: 3000,
				}}
			>
				{heroSlideData.map((item, index) => (
					<SwiperSlide key={index}>
						{({ isActive }) => (
							<div
								className={`hero-slide__item 
                           ${isActive ? 'active' : ''}`}
							>
								<div className='hero-slide__item__info'>
									<h2
										className={`hero-slide__item__info__title color-${item.color}`}
									>
										{item.title}
									</h2>
									<p className='hero-slide__item__info__desc'>
										{item.description}
									</p>
									<div className='hero-slide__item__info__btn'>
										<Button
											icon='bx bx-cart bx-tada'
											animate={true}
											size='lg'
										>
											Xem chi tiết
										</Button>
									</div>
								</div>
								<div className='hero-slide__item__img'>
									<div className={`shape bg-${item.color}`}></div>
									<img src={item.img} alt='' />
								</div>
							</div>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default HeroSlide
