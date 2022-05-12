const serviceSales = require('../services/servicesales');

const getSalesControler = async (_req, res) => {
    const sales = await serviceSales.getSalesServices();
    return res.status(200).json(sales);
};

const getSalesIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const salesId = await serviceSales.getSalesByIdServices(id);
        return res.status(200).json(salesId);
    } catch (err) {
         return res.status(err.error).json({ message: err.message });
        }
};

const createSales = async (req, res) => {
    try {
        const data = req.body;
        const salesId = await serviceSales.createSales(data);
        return res.status(201).json(salesId);
    } catch (err) {
         return res.status(err.error).json({ message: err.message });
        }
};

const updateSales = async (req, res) => {
        const data = req.body;
        const { id } = req.params;
        const updatesale = await serviceSales.updateSales(data, id);
        return res.status(200).json(updatesale);
};

const deleteSales = async (req, res) => {
    try {
    const { id } = req.params;
    await serviceSales.validDelete(id);
    return res.status(204).send();
    } catch (err) {
     return res.status(err.error).json({ message: err.message });
    }
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
    createSales,
    updateSales,
    deleteSales,
};
