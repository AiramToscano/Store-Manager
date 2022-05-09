const modelProducts = require('../models/modelproducts');

const getProductsServices = async () => {
    const products = await modelProducts.getProducts();
    return products;
};

const getProductsByIdServices = async (id) => {
    const productsID = await modelProducts.getProductsById(id);
    return productsID;
};

const validCreate = async (name, quantity) => {
    const products = await modelProducts.getProducts();
    const validproduct = products.some((e) => e.name === name);
    if (!validproduct) {
       const newproduct = await modelProducts.createProducts(name, quantity);
       const { insertId } = newproduct;
       return insertId;
    }
    return false;
};

module.exports = {
    getProductsServices,
    getProductsByIdServices,
    validCreate,
};
