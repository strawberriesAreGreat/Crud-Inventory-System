'use strict';
const falso = require('@ngneat/falso');

const randomInventories = [...Array(500)].map((vendors) => (
  {
    location_id: falso.randNumber({ min: 1, max: 5}) ,
    item_id: falso.randNumber({ min: 0, max: 99}),
    stock: falso.randNumber({ min: 0, max: 500}),
    unitsSold: falso.randNumber({ min: 5, max: 5000 }) 
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