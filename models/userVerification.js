module.exports = function (sequelize, DataTypes) {
	const UserVerification = sequelize.define('userVerification', {
		secret: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expiredAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})

	return UserVerification
}
