const db = require('../models')
const Members = db.Member

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