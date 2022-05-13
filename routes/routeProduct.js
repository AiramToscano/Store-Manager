const express = require('express');

const { getProductsControler,
    getProductsIdControler,
    registerProduct, updateProduct, deleteProduct } = require('../controllers/controllerproducts');

const { validNameUndefined,
        validNameLength,
        validQuantityUndefined,
        validQuantityLength } = require('../middlewares/middlewaresProducts');

const routerProduct = express.Router();
routerProduct.get('/:id', getProductsIdControler);
routerProduct.get('/', getProductsControler);
routerProduct.put('/:id', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength, updateProduct);
routerProduct.post('/', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength, registerProduct);
routerProduct.delete('/:id', deleteProduct);

module.exports = routerProduct;
