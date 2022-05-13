const express = require('express');

const { validUndefinedSales,
    validQuantityLengthSales } = require('../middlewares/middlewaresSales');
  
const { getSalesControler,
    getSalesIdControler, 
    createSales, updateSales, deleteSales } = require('../controllers/controllersales');

const routerSales = express.Router();

routerSales.get('/:id', getSalesIdControler);
routerSales.get('/', getSalesControler);
routerSales.put('/:id', validUndefinedSales,
    validQuantityLengthSales, updateSales);
routerSales.post('/', validUndefinedSales, 
    validQuantityLengthSales, createSales);
routerSales.delete('/:id', deleteSales);

module.exports = routerSales;