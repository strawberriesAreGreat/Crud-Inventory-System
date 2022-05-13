'use strict';
const falso = require('@ngneat/falso');

const fiveVendors = [
  {
      location: "West Toronto",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      location: "Montreal - Plateau ",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      location: "Central Chicago",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      location: "Oak Hill",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      location: "Columbus",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('location', fiveVendors, {});

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('location', null, {});
  }
};
