const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const location = sequelize.define("location", {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
    },{ tableName: 'location',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
    return location;
};
