const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define("product", {    
          sku: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          name: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          price: {
            type: Sequelize.STRING
          },
          rating_rate: {
            type: Sequelize.INTEGER
          },
          rating_count: {
            type: Sequelize.INTEGER
          },
          category: {
            type: Sequelize.STRING
          },

    },
    { tableName: 'product',
    timestamps: false,
    createdAt: false,
    updatedAt: false,});

    return product;
};