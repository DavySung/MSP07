const db = require('../models')
const Members = db.Member
const Op = require('sequelize').Op

exports.GetMembersAsync = async (req, res) => {
  return await Members.findAll();
}

//get a member by their cusotomer number /api/member/get/customerNumber
exports.GetMemberAsync = async (req, res) => {
  return await Members.findAll({
    where: {
      customerNumber: {
        [Op.like]: req.params.customerNumber
      }
    }
  })
}

exports.CreateMemberAsync = async(req, res) => {
  
}
