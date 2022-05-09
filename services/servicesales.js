const modelsales = require('../models/modelsales');

const getSalesServices = async () => {
    const sales = await modelsales.getSales();
    return sales;
};

const getSalesByIdServices = async (id) => {
    const salesID = await modelsales.getSalesById(id);
    return salesID;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
};
