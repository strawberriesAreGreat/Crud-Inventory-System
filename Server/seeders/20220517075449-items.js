'use strict';
const falso = require('@ngneat/falso');

const randomInventories = [...Array(20000)].map((items) => (
  {
    sku: falso.randNumber({ min: 1, max: 100}),
    transaction_id: falso.randNumber({ min: 0, max: 5000}),
    volume: falso.randNumber({ min: 0, max: 10}),
  }
))


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('item', randomInventories,{ ignoreDuplicates: true });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('item', null, {});
  }
};