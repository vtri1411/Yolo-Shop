import React, { useEffect, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'

import orderHistoryColumn from '../../config/table/orderHistoryColumn'

import { useTable } from 'react-table'

import Marginer from '../../components/Marginer'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../../redux/order/order.actions'

const mapState = ({ order }) => ({ orders: order.orders })
const OrderHistory = () => {
	const dispatch = useDispatch()

	const { orders } = useSelector(mapState)

	const { columns, data } = useMemo(
		() => ({ columns: orderHistoryColumn, data: orders }),
		[orders]
	)
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data })

	useEffect(() => {
		dispatch(getOrderHistory())
	}, [])

	return (
		<div className='user__content__wrapper'>
			<div className='user__content__title'>
				<div className='user__content__title__text'>Lịch sử mua hàng</div>
				<div className='user__content__title__desc'>
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</div>
			</div>

			<div className='user__content__orderHistory'>
				<Marginer margin={40} />
				{orders && (
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
											<td {...cell.getCellProps()}> {cell.render('Cell')}</td>
										))}
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

export default OrderHistory
