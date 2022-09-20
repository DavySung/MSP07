'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasOne(models.Product, {
        foreignKey: 'productCode',
        onDelete: 'CASCADE'
      });
      Transaction.hasOne(models.Member, {
        foreignKey: 'customerNumber',
        onDelete: 'CASCADE'
      });
      Transaction.hasOne(models.ProductPrice, {
        foreignKey: 'productPriceID',
        onDelete: 'CASCADE'
      });
    }
  }
  Transaction.init({
    customerNumber: DataTypes.STRING,
    productCode: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    productPriceID: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
