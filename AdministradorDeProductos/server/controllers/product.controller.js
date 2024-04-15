const {Product} = require('../models/product.model');

module.exports.createProduct = (request, response) => {
    let data = request.body;
    let product = new Product(data);
    product.save()
        .then(() => {
            response.statusCode = 200
            response.json(request.body);
        })
        .catch((error) => {
            response.statusCode = 500
            response.json({error: error})
        })
}

module.exports.getProducts = (request, response) => {
    Product.find()
        .then((values) => {
            response.statusCode = 200
            response.json({products: values});
        })
        .catch((error) => {
            response.statusCode = 500
            response.json({error: error})
        })
}

module.exports.getOneProduct = (request, response) => {
    Product.findOne({_id: request.params.id})
        .then((oneProduct) => {
            response.statusCode = 200
            response.json({product: oneProduct})
        })
        .catch((error) => {
            response.statusCode = 500
            response.json({error: error})
        })
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
        .then((updatedProduct) => {
            response.json({product: updatedProduct})
        })
        .catch((error) => {
            response.statusCode = 500
            response.json({error: error})
        })
}

module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({_id: request.params.id})
        .then((deletedProduct) => {
            response.json({product: deletedProduct})
        })
        .catch((error) => {
            response.statusCode = 500
            response.json({error: error})
        })
}
