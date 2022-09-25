const productPriceService = require('../services/productPriceService.js')

exports.getProductPrices = async(req, res) => {
    try {
        return res.status(200).send(await productPriceService.GetMembersAsync());
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        });
    }
}

exports.deleteProductPrice = async (req, res) => {
    try {
        return res.status(200).send(await productPriceService.DeleteMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.updateProductPrice = async (req, res) => {
    try {
        return res.status(200).send(await productPriceService.UpdateMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.createProductPrice = async (req, res) => {
    try {
        return res.status(200).send(await productPriceService.CreateMemberAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}