'use strict';

const fiveVendors = [
  {
      city:"Toronto",
      latitude: 43.674583 ,
      longitude: -79.490027,
  },
  {
      city:"Montreal",
      latitude:45.520188,
      longitude:-73.609483,
  },
  {
      city:"Chicago",
      latitude:41.739973,
      longitude:-87.702197,
  },
  {
      city:"Oak Hill",
      latitude:36.076834,
      longitude:-86.788773,
  },
  {
      city:"Columbus",
      latitude:39.939403,
      longitude:-82.980282,
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('vendors', fiveVendors, {});

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('vendors', null, {});
  }
};
