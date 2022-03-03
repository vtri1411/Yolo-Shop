module.exports = function (sequelize, DataTypes) {
	const Color = sequelize.define(
		'color',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			hex: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ timestamps: false }
	)
	return Color
}
