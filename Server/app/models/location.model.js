const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const location = sequelize.define("location", {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      storeName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      } 
    },{ tableName: 'location'
});
    return location;
};