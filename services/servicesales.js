const modelsales = require('../models/modelsales');
const modelproducts = require('../models/modelproducts');

const serviceProduct = require('./serviceproducts');

const objError = {
    error: 404,
    message: 'Sale not found',
};
const objErrorSales = {
    error: 422,
    message: 'Such amount is not permitted to sell',
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

const verificProducts = async (data) => {
    const verifcproduct = await Promise.all((data.map(async (e) => {
        const [teste] = await modelproducts.getProductsById(e.productId);
        if (teste.quantity - e.quantity >= 0) return true;
        throw objErrorSales;
    })));
    return verifcproduct;
};

const createSales = async (data) => {
    const datanow = '2022-05-10 22:20:10'; // mokei uma data qualquer
    await verificProducts(data);
    const sales = await modelsales.createSales(datanow);
    await data.forEach(async (e) => {
        modelsales.createSalesProducers(sales.id, e.productId, e.quantity);
    });
    await serviceProduct.updateQuantiProducts(data);
    const getsales = await modelsales.getSalesAndProducts(sales.id);
     if (getsales.length < 1) throw objError;
     const ojb = {
         id: sales.id,
         itemsSold: getsales,
     };
    return ojb;
};

const updateSales = async (data, id) => {
    await data.forEach(async (e) => {
        await modelsales.updateSales(id, e.productId, e.quantity);
    });
    const obj = {
        saleId: id,
        itemUpdated: data,
    };
    return obj;
};

const validDelete = async (id) => {
    const salesID = await modelsales.getSalesById(id);
    if (salesID.length > 0) {
        await modelsales.deleteSales(id);
        await serviceProduct.updateQuantiProductsDelete(salesID);
        return true;
    }
    throw objError;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
    createSales,
    updateSales,
    validDelete,
};
