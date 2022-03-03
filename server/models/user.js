module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.STRING,
		},
	})

	return User
}
