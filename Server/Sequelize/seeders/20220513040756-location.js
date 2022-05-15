'use strict';
const falso = require('@ngneat/falso');

const fiveVendors = [
  {
      name: "West Toronto",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      name: "Montreal - Plateau ",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      name: "Central Chicago",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      name: "Oak Hill",
      phone: falso.randUser().phone,
      email:falso.randUser().email
  },
  {
      name: "Columbus",
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