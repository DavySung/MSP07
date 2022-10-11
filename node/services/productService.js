const { timeStamp } = require('console');
const { now } = require('sequelize/types/utils');
const db = require('../models')
const Product = db.Product

exports.GetProductsAsync = async (req, res) => {
  try{
    return { message: await Product.findAll(), result: true };
  }
  catch (error) {  
    console.log(`Error: ${error}`);
    return { message: error, result: false };
  }
  
}

exports.CreateProductAsync = async (req, res) => {
  if (!req) {
      return {message: "No form input recieved", result: false};
  } else {
      try {
          await Product.create({
              productCode: req.body.productCode,
              productName: req.body.productName.toLowerCase(),
              productDesc: req.body.productDesc,
              //createdDate: req.body.createdDate
          })
          return {message: "Product added to database", result: true};
      }
      catch (error) {
          console.log(`Error: ${error}`);
          return { message: error.message, result: false };
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
              productDesc: req.body.productDesc
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