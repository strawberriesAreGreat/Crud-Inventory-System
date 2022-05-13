const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const transaction = sequelize.define("transaction", {
    transaction_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
      },
      dateTime: {
        type: Sequelize.DATE
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      location_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
        model: 'location', // <<< Note, its table's name, not object name
        key: 'location_id' // <<< Note, its a column name
      }
    },
    },{ tableName: 'transaction'
});
    return transaction;
};