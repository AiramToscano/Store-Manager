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
    const { id } = sales;
    const products = await Promise.all(data.map(async (e) => {
        await modelsales.createSalesProducers(id, e.productId, e.quantity);
        const getsales = await modelsales.getSalesAndProducts(id);
        console.log(getsales);
        if (getsales === undefined) throw objError;
        return getsales;
    }));
    // console.log(products);
    const obj = {
        id,
        itemsSold: products,
    };
    return obj;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
    createSales,
};
