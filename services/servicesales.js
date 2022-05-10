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

module.exports = {
    getSalesServices,
    getSalesByIdServices,
};
