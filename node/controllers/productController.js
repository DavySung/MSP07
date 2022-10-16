const productService = require('../services/productService.js')

exports.getProducts = async(req, res) => {
    try {
        return res.status(200).send(await productService.GetProductsAsync());
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        return res.status(200).send(await productService.DeleteProductAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        console.log("Controller")
        return res.status(200).send(await productService.UpdateProductAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        return res.status(200).send(await productService.CreateProductAsync(req, res))
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error.message
        })
    }
}