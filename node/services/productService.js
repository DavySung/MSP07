const db = require('../models')
const Product = db.Product

exports.GetProductsAsync = async (req, res) => {
  return await Product.findAll();
}

exports.CreateProductAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await Product.create({
              productCode: req.body.productCode,
              productName: req.body.productName,
              productDesc: req.body.productDesc,
              //createdDate: req.body.createdDate
          })
          return true;
      }
      catch (error) {
          console.log(`Error: ${error}`);
          return false;
      }
  }
}

exports.UpdateProductAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await Product.update({
              productCode: req.body.productCode,
              productName: req.body.productName,
              productDesc: req.body.productDesc,
              //createdDate: req.body.createdDate
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

exports.DeleteProductAsync = async (req, res) => {
  if (!req) {
      return false;
  } else {
      try {
          await Product.destroy({
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