const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const address = sequelize.define("address", {
    location_id: {
            primaryKey: true,
          type: DataTypes.INTEGER,
          references: {
            model: 'location', // <<< Note, its table's name, not object name
            key: 'location_id' // <<< Note, its a column name
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
    },{ tableName: 'address',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
    return address;
};