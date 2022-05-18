const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const location = sequelize.define("location", {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      city_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'city', // <<< Note, its table's name, not object name
            key: 'city_id' // <<< Note, its a column name
          }
      },
      country: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      weather: {
        type: Sequelize.STRING
      },
    },{ tableName: 'location',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
    return location;
};