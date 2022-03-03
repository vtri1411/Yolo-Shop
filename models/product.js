module.exports = function (sequelize, DataTypes, Brand, Category) {
	const Product = sequelize.define('product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		unit: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	})

	return Product
}
