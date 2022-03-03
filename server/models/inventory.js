module.exports = function (sequelize, DataTypes) {
	const Inventory = sequelize.define('inventory', {
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	})

	return Inventory
}

