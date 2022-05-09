const modelProducts = require('../models/modelproducts');

const getProductsServices = async () => {
    const products = await modelProducts.getProducts();
    return products;
};

const getProductsByIdServices = async (id) => {
    const productsID = await modelProducts.getProductsById(id);
    return productsID;
};

module.exports = {
    getProductsServices,
    getProductsByIdServices,
};
