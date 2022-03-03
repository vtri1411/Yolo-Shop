module.exports = function (sequelize, DataTypes) {
	const Brand = sequelize.define(
		'brand',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ timestamps: false }
	)

	return Brand
}
