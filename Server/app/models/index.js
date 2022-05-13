
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    
    operatorsAliases: 0,   
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
  }
});

const db = {};


db.sequelize = sequelize;

db.address = require("./address.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.inventory = require("./inventory.model.js")(sequelize, Sequelize);


//many images to one user

module.exports = db;