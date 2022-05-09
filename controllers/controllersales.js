const serviceSales = require('../services/servicesales');

const getSalesControler = async (_req, res) => {
    try {
    const sales = await serviceSales.getSalesServices();
    return res.status(200).json(sales);
    } catch (err) {
        console.error(err);
    }
};

const getSalesIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const salesId = await serviceSales.getSalesByIdServices(id);
        if (salesId.length > 0) return res.status(200).json(salesId);
        return res.status(404).json({ message: 'Sale not found' });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
};
