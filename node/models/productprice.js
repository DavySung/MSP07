'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductPrice.belongsTo(models.Product, {
        foreignKey: 'productCode',
        onDelete: 'CASCADE'
      });
    }
  }
  ProductPrice.init({
    productCode: DataTypes.STRING,
    productPrice: DataTypes.DECIMAL,
    productPriceStartDate: DataTypes.DATE,
    productPriceEndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductPrice',
  });
  return ProductPrice;
};
