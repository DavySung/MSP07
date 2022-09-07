'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      addressFirstLine: {
        type: Sequelize.STRING
      },
      addressSecondLine: {
        type: Sequelize.STRING
      },
      addressSuburb: {
        type: Sequelize.STRING
      },
      addressState: {
        type: Sequelize.STRING(4)
      },
      addressPostcode: {
        type: Sequelize.STRING(5)
      },
      accountActiveIndicator: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};