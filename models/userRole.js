module.exports = function (sequelize, DataTypes) {
	const UserRole = sequelize.define('userRole', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	return UserRole
}
