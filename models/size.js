module.exports = function (sequelize, DataTypes) {
	const Size = sequelize.define(
		'size',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	)
	return Size
}
