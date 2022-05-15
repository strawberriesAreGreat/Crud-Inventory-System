'use strict';
const falso = require('@ngneat/falso');

const randomInventories = [...Array(6000)].map((transactions) => (
  {
    dateTime: falso.randBetweenDate({ from: new Date('04/11/2015'), to: new Date('05/05/2022')}),
    paymentMethod: falso.randCreditCardBrand(),
    location_id: falso.randNumber({ min: 1, max: 5}),
  }
))
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transaction', randomInventories,{ ignoreDuplicates: true } );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transaction', null, {});
  }
};