const db = require('../models')
const Members = db.Member

exports.GetMembersAsync = async (req, res) => {
  return await Members.findAll();
}

//http://emailregex.com/
let emailRegex =  	
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Rob: I made these ones up on the spot so they wont be perfect by any stretch
let phoneRegex = /^\d{10}$/;
let addressFirstLineRegex = /^\d+\ .*$/;
//Internet suggests that postcodes may also come in 3 digit form (with a leading 0 omitted), not going to cover this case for now
let addressPostcodeRegex = /^\d{4}$/

function validateMember(member) {
  //firstname and lastname just need to be not null, this could be handled on the database side
  if(!emailRegex.test(member.email))
    return "Invalid email address";
  if(!phoneRegex.test(member.phone))
    return "Invalid phone number";
  if(!addressFirstLineRegex.test(member.addressFirstLine))
    return "Invalid address";
  if(!addressPostcodeRegex.test(member.addressPostcode))
    return "Invalid postcode";

  return "OK";
}

exports.CreateMemberAsync = async (req, res) => {
  if (!req) {
    return false;
  } else {
    try {
      let member = {
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
      }
      let valid = validateMember(member);
      if(valid !== "OK")
        throw(valid)
      await Members.create(member).then(member => {
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
      return true;
    }
    catch (error) {
      console.log(`Error: ${error}`);
      throw(error);
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