const db = require('../models')
const Members = db.Member

exports.GetMembersAsync = async (req, res) => {
  return await Members.findAll();
}

exports.CreateMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      await Members.create({
        customerNumber: req.body.customerNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        addressFirstLine: req.body.addressFirstLine,
        addressSecondLine: req.body.addressSecondLine,
        addressSuburb: req.body.addressSuburb,
        addressState: req.body.addressState,
        addressPostcode: req.body.addressPostcode,
        accountActiveIndicator: req.body.accountActiveIndicator
      })
      return true;
    }
    catch (error) {
      console.log(`Error: ${error}`);
      return false;
    }
  }
}

exports.UpdateMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      await Members.update({
        customerNumber: req.body.customerNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        addressFirstLine: req.body.addressFirstLine,
        addressSecondLine: req.body.addressSecondLine,
        addressSuburb: req.body.addressSuburb,
        addressState: req.body.addressState,
        addressPostcode: req.body.addressPostcode,
        accountActiveIndicator: req.body.accountActiveIndicator
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

//this will always return true, despite not deleting anything
exports.DeleteMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      await Members.destroy({
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