const config = require("./config/config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  process.env.db_name, 
  process.env.db_user,
  process.env.db_pswd, {
    operatorsAliases: 0,   
    host: process.env.db_host,
    dialect: process.env.db_dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);

const db = {};


db.sequelize = sequelize;


db.city = require("./models/city.model.js")(sequelize, Sequelize);
db.location = require("./models/location.model.js")(sequelize, Sequelize);
db.products = require("./models/product.model.js")(sequelize, Sequelize);
db.inventories = require("./models/inventory.model.js")(sequelize, Sequelize);
db.transactions = require("./models/transaction.model.js")(sequelize, Sequelize);
db.items = require("./models/item.model.js")(sequelize, Sequelize);

//many images to one user

module.exports = db;