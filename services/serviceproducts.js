const modelProducts = require('../models/modelproducts');

const objErrorNotFound = {
    error: 404,
    message: 'Product not found',
};
const objErrorExists = {
    error: 409,
    message: 'Product already exists',
};
const getProductsServices = async () => {
    const products = await modelProducts.getProducts();
    return products;
};

const getProductsByIdServices = async (id) => {
    const productsID = await modelProducts.getProductsById(id);
    if (productsID.length < 1) throw objErrorNotFound;
    return productsID;
};

const validCreate = async (name, quantity) => {
    const products = await modelProducts.getProducts();
    const validproduct = products.some((e) => e.name === name);
    if (!validproduct) {
       const newproduct = await modelProducts.createProducts(name, quantity);
       return newproduct;
    }
    throw objErrorExists;
};

const validUpdate = async (id, name, quantity) => {
    const products = await modelProducts.getProductsById(id);
    if (products.length > 0) {
        await modelProducts.updateProducts(id, name, quantity);
        const [productsnew] = await modelProducts.getProductsById(id);
        return productsnew;
    }
    throw objErrorNotFound;
};

const validDelete = async (id) => {
    const products = await modelProducts.getProductsById(id);
    if (products.length > 0) {
        await modelProducts.deleteProducts(id);
        return true;
    }
    throw objErrorNotFound;
};

module.exports = {
    getProductsServices,
    getProductsByIdServices,
    validCreate,
    validUpdate,
    validDelete,
};
