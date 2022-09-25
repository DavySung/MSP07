const db = require('../models')
const ProductPrice = db.ProductPrice

exports.GetProductPricesAsync = async (req, res) => {
  return await ProductPrice.findAll();
}

exports.CreateProductPriceAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await ProductPrice.create({
              produceCode: req.body.produceCode,
              producePrice: req.body.producePrice,
              producePriceStartDate: req.body.producePriceStartDate,
              productPriceEndDate: req.body.productPriceEndDate
          })
          return true;
      }
      catch (error) {
          console.log(`Error: ${error}`);
          return false;
      }
  }
}

exports.UpdateProductPriceAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await ProductPrice.update({
              produceCode: req.body.produceCode,
              producePrice: req.body.producePrice,
              producePriceStartDate: req.body.producePriceStartDate,
              productPriceEndDate: req.body.productPriceEndDate
          }, {
            where: {
              id: req.body.id
            }
          })
          return true;
      }
      catch (error) {
          console.log(`Error: ${error}`);
          return false;
      }
  }
}

exports.DeleteProductPriceAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await ProductPrice.destroy({
            where: {
              id: req.body.id
            }
          })
          return true;
      }
      catch (error) {
          console.log(`Error: ${error}`);
          return false;
      }
  }
}