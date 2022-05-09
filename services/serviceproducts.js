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

const validUpdate = async (id, name, quantity) => {
    const products = await modelProducts.getProductsById(id);
    if (products.length > 0) {
        await modelProducts.updateProducts(id, name, quantity);
        const [productsnew] = await modelProducts.getProductsById(id);
        return productsnew;
    }
    return false;
};

const validDelete = async (id) => {
    const products = await modelProducts.getProductsById(id);
    if (products.length > 0) {
        await modelProducts.deleteProducts(id);
        return true;
    }
    return false;
};

module.exports = {
    getProductsServices,
    getProductsByIdServices,
    validCreate,
    validUpdate,
    validDelete,
};
