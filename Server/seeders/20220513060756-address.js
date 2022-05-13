'use strict';
const falso = require('@ngneat/falso');

const fiveAddresses = [
  {
    location_id:1,
      country:"Canada",
      region:"Ontario",
      city:"Toronto",
      street: falso.randAddress().street,
      zipCode:falso.randAddress().zipCode,
      latitude:43.679676, 
      longitude:-79.476745
  },
  {
    location_id:2,
      country:"Canada",
      region:"Quebec",
      city:"Montreal",
      street: falso.randAddress().street,
      zipCode:falso.randAddress().zipCode,
      latitude:45.520188,
      longitude:-73.609483,
  },
  {
    location_id:3,
      country:"United States",
      region:"Illinois",
      city:"Chicago",
      street: falso.randAddress().street,
      zipCode:falso.randAddress().zipCode,
      latitude:41.739973,
      longitude:-87.702197,
  },
  {
    location_id:4,
      country:"United States",
      region:"Tennessee",
      city:"Oak Hill",
      street: falso.randAddress().street,
      zipCode:falso.randAddress().zipCode,
      latitude:36.076834,
      longitude:-86.788773,
  },
  {
    location_id:5,
      country:"United States",
      region:"Ohio",
      city:"Columbus",
      street: falso.randAddress().street,
      zipCode:falso.randAddress().zipCode,
      latitude:39.939403,
      longitude:-82.980282,
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('address', fiveAddresses,{ ignoreDuplicates: true });

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('address', null, {});
  }
};
