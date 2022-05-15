const config = require("../config/config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  config.MYSQL.db, config.MYSQL.user, config.MYSQL.password, {
    operatorsAliases: 0,   
    host: config.MYSQL.host,
    dialect: config.MYSQL.dialect,
    operatorsAliases: false,
    pool: {
      max: config.MYSQL.max,
      min: config.MYSQL.min,
      acquire: config.MYSQL.acquire,
      idle:config.MYSQL.idle,
    }
  }
);

const db = {};


db.sequelize = sequelize;

db.vendors = require("./models/address.model.js")(sequelize, Sequelize);
db.vendors = require("./models/location.model.js")(sequelize, Sequelize);
db.products = require("./models/product.model.js")(sequelize, Sequelize);
db.inventories = require("./models/inventory.model.js")(sequelize, Sequelize);
db.transactions = require("./models/transaction.model.js")(sequelize, Sequelize);
db.items = require("./models/item.model.js")(sequelize, Sequelize);

//many images to one user

module.exports = db;