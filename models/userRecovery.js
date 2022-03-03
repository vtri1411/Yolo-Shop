module.exports = function (sequelize, DataTypes) {
	const userRecovery = sequelize.define('userRecovery', {
		secret: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expiredAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})

	return userRecovery
}
