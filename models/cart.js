module.exports = function (sequelize, DataTypes) {
	const Cart = sequelize.define('cart', {
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

	return Cart
}
