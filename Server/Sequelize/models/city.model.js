const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const city = sequelize.define("city", {
      city_id: {
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
    },{ tableName: 'city',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
    return city;
};
