const { DataTypes, Sequelize, Op, QueryTypes } = require('sequelize')

const sequelize =
	process.env.NODE_ENV === 'production'
		? new Sequelize(
				process.env.MYSQLDATABASE,
				process.env.MYSQLUSER,
				process.env.MYSQLPASSWORD,
				{
					host: process.env.MYSQLHOST,
					dialect: 'mysql',
					logging: false,

					pool: {
						max: 5,
						min: 1,
						acquire: 30000,
						idle: 10000,
					},
				}
		  )
		: new Sequelize(
				process.env.LC_MYSQLDATABASE,
				process.env.LC_MYSQLUSER,
				process.env.LC_MYSQLPASSWORD,
				{
					host: process.env.LC_MYSQLHOST,
					dialect: 'mysql',
					logging: false,

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
	.catch((error) => console.log(error))

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

// Prodcut associations
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' })
db.Product.belongsTo(db.Category)

db.Brand.hasMany(db.Product, { foreignKey: 'brandId' })
db.Product.belongsTo(db.Brand)

db.Product.hasMany(db.Image)
db.Image.belongsTo(db.Product)

db.Product.hasMany(db.Inventory)
db.Inventory.belongsTo(db.Product)
// Product associations

// Inventory associations
db.Size.hasMany(db.Inventory)
db.Inventory.belongsTo(db.Size)

db.Color.hasMany(db.Inventory)
db.Inventory.belongsTo(db.Color)

//    Super Many-To-Many
db.Inventory.belongsToMany(db.User, { through: db.Cart })
db.User.belongsToMany(db.Inventory, { through: db.Cart })
db.Inventory.hasMany(db.Cart)
db.Cart.belongsTo(db.Inventory)
db.User.hasMany(db.Cart)
db.Cart.belongsTo(db.User)
//    Super Many-To-Many

db.Inventory.belongsToMany(db.User, { through: db.OrderHistory })
db.User.belongsToMany(db.Inventory, { through: db.OrderHistory })
db.Inventory.hasMany(db.OrderHistory)
db.OrderHistory.belongsTo(db.Inventory)
db.User.hasMany(db.OrderHistory)
db.OrderHistory.belongsTo(db.User)
// Inventory associations

// User associations
db.User.hasOne(db.UserVerification)
db.UserVerification.belongsTo(db.User)

db.User.hasOne(db.UserRecovery)
db.UserRecovery.belongsTo(db.User)
// User associations

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
