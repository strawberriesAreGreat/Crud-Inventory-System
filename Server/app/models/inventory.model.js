const { user } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const inventory = sequelize.define("inventory", {    
        location_id: {
            primaryKey: true,
          type: DataTypes.INTEGER,
          references: {
            model: 'location', // <<< Note, its table's name, not object name
            key: 'location_id' // <<< Note, its a column name
          }
        },
        item_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'items',
                key: 'item_id' 
            }
        },
        stock: {
            type: Sequelize.INTEGER,
        },
        unitsSold: {
            type: Sequelize.INTEGER,
        }
    },
    { tableName: 'inventory'});
    
    return inventory;
    
};