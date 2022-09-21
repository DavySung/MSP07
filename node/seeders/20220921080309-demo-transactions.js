'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Transactions', [{
      customerNumber: '12345678',
      productCode: 'A1',
      transactionDate: new Date(),
      productPriceID: 1,
      orderID: 118,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
     
  }
};
