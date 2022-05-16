const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const item = sequelize.define("item", {    
        sku: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'sku' 
            }
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'transaction', 
                key: 'transaction_id' 
          }
        },
        volume: {
            type: Sequelize.INTEGER
        },
    },
    { tableName: 'item',
    timestamps: false,
    createdAt: false,
    updatedAt: false,});

    return item;
};