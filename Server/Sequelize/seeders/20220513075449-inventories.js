'use strict';
const falso = require('@ngneat/falso');

const randomInventories = [...Array(1000)].map((inventories) => (
  {
    location_id: falso.randNumber({ min: 1, max: 5}) ,
    sku: falso.randNumber({ min: 1, max: 100}),
    stock: falso.randNumber({ min: 0, max: 500}),
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventory', randomInventories,{ ignoreDuplicates: true } );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventory', null, {});
  }
};