import React, { useEffect, useMemo, useState } from 'react'

import { useTable } from 'react-table'

import orderDetailColumn from '../../config/table/orderDetailColumn'

import Button from '../../components/Button'
import Maginer from '../../components/Marginer'
import UserForm from '../../components/User/UserForm'
import UserFormGroup from '../../components/User/UserFormGroup'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
	getOrderDetails,
} from '../../redux/order/order.actions'

const mapState = ({ order }) => ({ orderDetails: order.orderDetails })
const OrderDetail = () => {
	const dispatch = useDispatch()

	const { orderDetails } = useSelector(mapState)

	const [id, setId] = useState('')

	const { columns, data } = useMemo(
		() => ({ data: orderDetails, columns: orderDetailColumn }),
		[orderDetails]
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data })

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!id) {
			return toast.error('Vui lòng nhập mã đơn hàng !')
		}
		dispatch(getOrderDetails(id))
	}

	return (
		<div className='user__content__wrapper'>
			<div className='user__content__title'>
				<div className='user__content__title__text'>Chi tiết mua hàng</div>
				<div className='user__content__title__desc'>
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</div>
			</div>

			<div className='user__content__orderDetail'>
				<UserForm
					onSubmit={handleSubmit}
					className='user__content__orderDetail__form'
				>
					<UserFormGroup
						value={id}
						onChange={(e) => setId(e.target.value)}
						label='Id: '
						className='user__content__orderDetail__form__group'
					/>
					<Button className='user__content__orderDetail__form__btn'>
						Tìm kiếm
					</Button>
				</UserForm>

				<Maginer margin={40} />

				<table className='table' {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => (
										<td {...cell.getCellProps()}>
											{' '}
											{cell.render('Cell')}
										</td>
									))}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default OrderDetail
