const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const inventory = sequelize.define("inventory", {    
        location_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
            model: 'location', 
            key: 'location_id' 
          }
        },
        sku: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'sku' 
            }
        },
        stock: {
            type: Sequelize.INTEGER,
        },

    },
    { tableName: 'inventory',
    timestamps: false,
    createdAt: false,
    updatedAt: false,});
    
    return inventory;
    
};