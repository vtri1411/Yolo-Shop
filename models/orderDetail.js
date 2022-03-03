module.exports = function (sequelize, DataTypes) {
	const OrderDetail = sequelize.define('orderDetail', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
         allowNull: false,
		},
	})

	return OrderDetail
}
