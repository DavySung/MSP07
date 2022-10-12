const db = require('../models')
const Members = db.Member

//from productService.js
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

exports.GetMembersAsync = async (req, res) => {
  try {
    return { message: await Members.findAll(), result: true};
  } catch(error) {
     console.log(`Error: ${error}`);
    return { message: error, result: false };
  }
}

exports.CreateMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      await Members.create({
        customerNumber: "",
        firstName: titleCase(req.body.firstName),
        lastName: titleCase(req.body.lastName),
        email: req.body.email,
        phone: req.body.phone,
        addressFirstLine: titleCase(req.body.addressFirstLine),
        addressSecondLine: titleCase(req.body.addressSecondLine),
        addressSuburb: titleCase(req.body.addressSuburb),
        addressState: req.body.addressState.toUpperCase(),
        addressPostcode: req.body.addressPostcode,
        accountActiveIndicator: req.body.accountActiveIndicator
      }).then(member => {
        Members.update({
          //take the autoincremented (on the serverside) id number and add a random customer number to that
          //ensures both security and uniqueness
          customerNumber: String(member.id).concat(Math.floor(Math.random() * 1000000000))
        }, {
          where: {
            id: member.id
          }
        })
      })
      return { message: "member created", result: true }
    }
    catch (error) {
      console.log(`Error: ${error}`);
      return { message: error.message, result: false };
    }
  }
}

exports.UpdateMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      await Members.update({
        //should customerNumber be allowed to be updated?
        customerNumber: req.body.customerNumber,
        firstName: titleCase(req.body.firstName),
        lastName: titleCase(req.body.lastName),
        email: req.body.email,
        phone: req.body.phone,
        addressFirstLine: titleCase(req.body.addressFirstLine),
        addressSecondLine: titleCase(req.body.addressSecondLine),
        addressSuburb: titleCase(req.body.addressSuburb),
        addressState: req.body.addressState.toUpperCase(),
        addressPostcode: req.body.addressPostcode,
        accountActiveIndicator: req.body.accountActiveIndicator         
      }, {
        where: {
          id: req.body.id
        }
      })
      return { message: "member updated", result: true };
    }
    catch (error) {
      console.log(`Error: ${error}`);
      return { message: error.message, result: false };
    }
  }
}

//this will always return true, despite not deleting anything
exports.DeleteMemberAsync = async (req, res) => {
  if (!req) {
    return { message: "no body recieved", result: false };
  } else {
    try {
      await Members.destroy({
        where: {
          id: req.body.id
        }
      })
      return { message: "member deleted", result: true};
    }
    catch (error) {
      console.log(`Error: ${error}`);
      return { message: error.message, result: false };
    }
  }
}