import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/Logo-2.png'

import Grid from './Grid'

const Footer = () => {
	return (
		<div className='footer'>
			<div className='container'>
				<Grid col={4} mdCol={2} smCol={1} gap={20}>
					<div>
						<h3 className='footer__title'>Tổng đài hỗ trợ</h3>
						<div className='footer__content'>
							<a href={`tel:0123456789`}>
								<p>
									Liên hệ đặt hàng - <strong>0123456789</strong>
								</p>
							</a>
							<a href={`tel:0123456789`}>
								<p>
									Thắc mắc đơn hàng - <strong>0123456789</strong>
								</p>
							</a>
							<a href={`tel:0123456789`}>
								<p>
									Góp ý, Khiếu nại - <strong>0123456789</strong>
								</p>
							</a>
						</div>
					</div>
					<div>
						<h3 className='footer__title'>Về Yolo</h3>
						<div className='footer__content'>
							<Link to=''>
								<p>Giới thiệu</p>
							</Link>
							<Link to=''>
								<p>Tuyển dụng</p>
							</Link>
							<Link to=''>
								<p>Tin tức</p>
							</Link>
							<Link to=''>
								<p>Hệ thống cửa hàng</p>
							</Link>
						</div>
					</div>
					<div>
						<h3 className='footer__title'>Tổng đài hỗ trợ</h3>
						<div className='footer__content'>
							<Link to=''>
								<p>Chính sách đổi trả</p>
							</Link>
							<Link to=''>
								<p>Chính sách bảo hành</p>
							</Link>
							<Link to=''>
								<p>Chính sách hoàn tiền</p>
							</Link>
						</div>
					</div>
					<div>
						<div className='footer__logo'>
							<Link to='/'>
								<img src={logo} alt='' />
							</Link>
						</div>
						<div className='footer__content'>
							<p className='footer__about'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Reiciendis unde iste, libero distinctio vero accusantium
								pariatur dolorem qui voluptate deleniti totam quas
								dolorum voluptas perferendis nesciunt nostrum
								voluptatibus. Labore ipsa veniam deserunt culpa. Quia at
								illo ipsa maiores fuga nemo.
							</p>
						</div>
					</div>
				</Grid>
			</div>
		</div>
	)
}

export default Footer
