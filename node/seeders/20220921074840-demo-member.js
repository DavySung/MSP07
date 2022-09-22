'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Members', [{
        customerNumber: '12345678',
        firstName: 'Jeff',
        lastName: 'Goldbloom',
        email: 'jeff.goldbloom@jurassicpark.com',
        phone: '0456889576',
        addressFirstLine: '1 Dinosaur Way',
        addressSuburb: 'Tropical paradise',
        addressState: 'VIC',
        addressPostcode: '3000',
        accountActiveIndicator: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
     }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {})
  }
};
