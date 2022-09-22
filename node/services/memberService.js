const db = require('../models')
const Members = db.Member

exports.GetMembersAsync = async (req, res) => {
    return await Members.findAll();
}
