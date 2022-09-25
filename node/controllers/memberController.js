const memberService = require('../services/memberService.js')

exports.getMembers = async(req, res) => {
    try {
        return res.status(200).send(await memberService.GetMembersAsync());
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        });
    }
}

/*
exports.getMember = async (req, res) => {
    try {
        return res.status(200).send(await memberService.GetMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}
*/

exports.deleteMember = async (req, res) => {
    try {
        return res.status(200).send(await memberService.DeleteMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.updateMember = async (req, res) => {
    try {
        return res.status(200).send(await memberService.UpdateMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.createMember = async (req, res) => {
    try {
        return res.status(200).send(await memberService.CreateMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}