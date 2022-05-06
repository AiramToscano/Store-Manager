const { getProducts, getProductsById } = require('../models/modelproducts');

const getProductsServices = async () => {
    const products = await getProducts();
    return products;
};

const getProductsByIdServices = async (id) => {
    const productsID = await getProductsById(id);
    return productsID;
};

module.exports = {
    getProductsServices,
    getProductsByIdServices,
};
