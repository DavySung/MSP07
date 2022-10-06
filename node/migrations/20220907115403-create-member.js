'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      customerNumber: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressFirstLine: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressSecondLine: {
        type: Sequelize.STRING
      },
      addressSuburb: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressState: {
        allowNull: false,
        type: Sequelize.STRING(4)
      },
      addressPostcode: {
        allowNull: false,
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