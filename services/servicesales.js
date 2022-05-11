const modelsales = require('../models/modelsales');

const objError = {
    error: 404,
    message: 'Sale not found',
};
const getSalesServices = async () => {
    const sales = await modelsales.getSales();
    return sales;
};

const getSalesByIdServices = async (id) => {
    const salesID = await modelsales.getSalesById(id);
    if (salesID.length < 1) throw objError;
    return salesID;
};

const createSales = async (data) => {
    const datanow = '2022-05-10 22:20:10'; // mokei uma data qualquer
    const sales = await modelsales.createSales(datanow);
    // if (sales === undefined) throw objError;
    const { id } = sales;
    const products = await Promise.all(data.map((e) => {
        modelsales.createSalesProducers(id, e.productId, e.quantity);
        const getsales = modelsales.getSalesAndProducts(id);
        return getsales;
    }));
    const obj = {
        id,
        itemsSold: products.length > 1 ? products.pop() : products[0], // irá retornar sempre o ultimo array
    };
    return obj;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
    createSales,
};
