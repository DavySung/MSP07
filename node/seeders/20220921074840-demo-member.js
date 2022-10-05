'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Members', 
     [
      {
        customerNumber: '12345678',
        firstName: 'Ian',
        lastName: 'Malcolm',
        email: 'dr.malcolm@jurassicpark.com',
        phone: '0456889576',
        addressFirstLine: '1 Dinosaur Way',
        addressSuburb: 'Tropical paradise',
        addressState: 'VIC',
        addressPostcode: '3000',
        accountActiveIndicator: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      customerNumber: '12345610',
      firstName: 'Ellie',
      lastName: 'Sadler',
      email: 'triceretops.poop@jurpark.com',
      phone: '0456889876',
      addressFirstLine: '100 Raptor Pen',
      addressSuburb: 'Tropical paradise',
      addressState: 'VIC',
      addressPostcode: '3000',
      accountActiveIndicator: 'True',
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    customerNumber: '12345679',
    firstName: 'Dennis',
    lastName: 'Nedry',
    email: 'shaving.cream@dilophosaurus.com',
    phone: '0456899576',
    addressFirstLine: '1 Deadmans Drive',
    addressSuburb: 'Tropical paradise',
    addressState: 'VIC',
    addressPostcode: '3000',
    accountActiveIndicator: 'True',
    createdAt: new Date(),
    updatedAt: new Date()
 }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {})
  }
};
