const { getSales, getSalesById } = require('../models/modelsales');

const getSalesServices = async () => {
    const sales = await getSales();
    return sales;
};

const getSalesByIdServices = async (id) => {
    const salesID = await getSalesById(id);
    console.log(salesID);
    return salesID;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
};
