import format from 'date-format'
import numberWithCommas from '../../utilities/numberWithCommas'

export default [
	{
		Header: 'Ảnh',
		accessor: 'inventory.product.images[0]',
		Cell: (row) => {
			return (
				<div>
					<img
						style={{ display: 'block', width: '70px' }}
						src={row.value.url}
					/>
				</div>
			)
		},
	},
	{
		Header: 'Mã sản phẩm',
		accessor: 'inventory.product.id',
	},
	{
		Header: 'Tên sản phẩm',
		accessor: 'inventory.product.name',
	},
	{
		Header: 'Màu sắc',
		accessor: 'inventory.color.name',
	},
	{
		Header: 'Size',
		accessor: 'inventory.size.name',
	},
	{
		Header: 'Giá tiền',
		accessor: 'inventory.product.price',
		Cell: ({ value }) => numberWithCommas(value),
	},
	{
		Header: 'Số lượng',
		accessor: 'quantity',
	},
	{
		Header: 'Ngày mua',
		accessor: 'createdAt',
		Cell: ({ value }) => format('dd/MM/yyyy hh:mm', new Date(value)),
	},
]
