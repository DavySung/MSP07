const db = require('../models')
const Members = db.Member
const Op = require('sequelize').Op

exports.GetMembersAsync = async (req, res) => {
  return await Members.findAll();
}

//get a member by their id
exports.GetMemberAsync = async (req, res) => {
  return await Members.findAll({
    where: {
      id: req.params.id
    }
  })
}

exports.DeleteMemberAsync = async (req, res) => {
  //they need to post data to select a user to delete
  if(!req) {
    return false
  } else {
    await Members.destroy({
      where: req.params.id
    }).then(async(result) => {
      console.log(result)
      return true
    })
  }
}

exports.CreateMemberAsync = async(req, res) => {
  
}
