module.exports = function (sequelize, DataTypes) {
	const Image = sequelize.define(
		'image',
		{
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	)
	return Image
}
