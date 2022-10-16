const { timeStamp } = require('console');
//const { now } = require('sequelize/types/utils');
const db = require('../models')
const Product = db.Product


function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

function sentenceCase(str){
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase();;
}

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
              productName: titleCase(req.body.productName),
              productDesc: sentenceCase(req.body.productDesc),
              createdAt: req.body.createdDate
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
  console.log("Service")
  if (!req) {
      return false;
  } else {
      try {
          await Product.update({
              productCode: req.body.productCode,
              productName: titleCase(req.body.productName),
              productDesc: sentenceCase(req.body.productDesc)
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