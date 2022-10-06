'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Transactions', [{
      customerNumber: '12345678',
      productCode: 'A1',
      transactionDate: new Date(),
      price: 19.9,
      orderID: 118,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});

  }
};
