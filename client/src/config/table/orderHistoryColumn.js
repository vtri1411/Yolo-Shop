import format from 'date-format'
import numberWithCommas from '../../utilities/numberWithCommas'

export default [
	{
		Header: 'Mã đơn hàng',
		accessor: 'id',
	},
	{
		Header: 'Số lượng sản phẩm',
		accessor: 'productAmount',
	},
	{
		Header: 'Tổng tiền',
		accessor: 'totalPrice',
		// Cell: (row) => (
		// 	<div>
		// 		<img style={{ display: 'block', width: '70px' }} src={row.value} />
		// 	</div>
		// ),
		Cell: ({ value }) => numberWithCommas(value),
	},
	{
		Header: 'Ngày mua',
		accessor: 'createdAt',
		Cell: ({ value }) => format('dd/MM/yyyy hh:mm', new Date(value)),
	},
]
