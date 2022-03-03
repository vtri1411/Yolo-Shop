module.exports = function (sequelize, DataTypes, User, Inventory) {
	const OrderHistory = sequelize.define('orderHistory', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
	})

	return OrderHistory
}
