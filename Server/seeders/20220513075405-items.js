'use strict';

const falso = require('@ngneat/falso');



const randomItems = [...Array(1000)].map((items) => (
    {
      name: falso.randProduct().title,
      description: falso.randProduct().description,
      price: falso.randProduct().price,
      rating_rate: falso.randFloat({ min: 0, max: 4, fraction: 2 }),
      rating_count: falso.randNumber({ min: 1000, max: 10000}),
      category: falso.randProduct().category,
    }
  ))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', randomItems, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {});
  }
};
