const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const item = sequelize.define("item", {    
        item_id: {
            allowNull: false,
            autoIncrement: true,
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
          }
    },
    { tableName: 'item'});

    return item;
};