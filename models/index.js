const { DataTypes, Sequelize, Op, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(
	process.env.MYSQLDATABASE,
	// 'railway',
	process.env.MYSQLUSER,
	// 'root',
	process.env.MYSQLPASSWORD,
	// 'zsyN74YZrHKA36qY5tHG',
	{
		host: process.env.MYSQLHOST,
		// host: 'containers-us-west-28.railway.app',
		dialect: 'mysql',
		logging: false,
		port: process.env.MYSQLPORT,
		// port: 6536,

		pool: {
			max: 5,
			min: 1,
			acquire: 30000,
			idle: 10000,
		},
	}
)

sequelize
	.authenticate()
	.then(() => console.log('Mysql connecting . . .'))
	.catch((error) => {})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Op
db.QueryTypes = QueryTypes

// Single table
db.Brand = require('./brand')(sequelize, DataTypes)
db.Category = require('./category')(sequelize, DataTypes)
db.Size = require('./size')(sequelize, DataTypes)
db.Color = require('./color')(sequelize, DataTypes)
db.User = require('./user')(sequelize, DataTypes)
db.UserRecovery = require('./userRecovery')(sequelize, DataTypes)
db.UserVerification = require('./userVerification')(sequelize, DataTypes)
db.Product = require('./product')(sequelize, DataTypes)
db.Image = require('./image')(sequelize, DataTypes)
db.Inventory = require('./inventory')(sequelize, DataTypes)
db.Cart = require('./cart')(sequelize, DataTypes)
db.OrderHistory = require('./orderHistory')(sequelize, DataTypes)
db.OrderDetail = require('./orderDetail')(sequelize, DataTypes)
db.UserRole = require('./userRole')(sequelize, DataTypes)
// Single table

// Prodcut associations start
db.Category.hasMany(db.Product, {
	foreignKey: 'categoryId',
	onDelete: 'CASCADE',
})
db.Product.belongsTo(db.Category)

db.Brand.hasMany(db.Product, { foreignKey: 'brandId', onDelete: 'CASCADE' })
db.Product.belongsTo(db.Brand)

db.Product.hasMany(db.Image, { onDelete: 'CASCADE' })
db.Image.belongsTo(db.Product)

db.Product.hasMany(db.Inventory, { onDelete: 'CASCADE' })
db.Inventory.belongsTo(db.Product)
// Product associations end

// Inventory associations start
db.Size.hasMany(db.Inventory, { onDelete: 'CASCADE' })
db.Inventory.belongsTo(db.Size)

db.Color.hasMany(db.Inventory, { onDelete: 'CASCADE' })
db.Inventory.belongsTo(db.Color)

db.Inventory.hasMany(db.OrderDetail, { onDelete: 'CASCADE' })
db.OrderDetail.belongsTo(db.Inventory)

//    Super Many-To-Many
db.Inventory.belongsToMany(db.User, { through: db.Cart, onDelete: 'CASCADE' })
db.User.belongsToMany(db.Inventory, { through: db.Cart, onDelete: 'CASCADE' })
db.Inventory.hasMany(db.Cart, { onDelete: 'CASCADE' })
db.Cart.belongsTo(db.Inventory)
db.User.hasMany(db.Cart, { onDelete: 'CASCADE' })
db.Cart.belongsTo(db.User)
//    Super Many-To-Many
// Inventory associations end

// User associations
db.User.hasOne(db.UserVerification, { onDelete: 'CASCADE' })
db.UserVerification.belongsTo(db.User)

db.User.hasOne(db.UserRecovery, { onDelete: 'CASCADE' })
db.UserRecovery.belongsTo(db.User)

db.User.hasMany(db.OrderHistory, { onDelete: 'CASCADE' })
db.OrderHistory.belongsTo(db.User)

db.User.hasMany(db.UserRole, { onDelete: 'CASCADE' })
db.UserRole.belongsTo(db.User)
// User associations

// Order History associations
db.OrderHistory.hasMany(db.OrderDetail, { onDelete: 'CASCADE' })
db.OrderDetail.belongsTo(db.OrderHistory)
// Order History associations

const force = false

db.sequelize
	.sync({ force })
	// .then(() =>
	// 	sequelize.query(
	// 		'CREATE FULLTEXT INDEX name_description_f_txt ON products(name,description)'
	// 	)
	// )
	.then(() => console.log(`Mysql are syncing with { force: ${force} } . . .`))
	.catch((err) => console.log(err))

module.exports = db
