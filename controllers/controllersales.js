const serviceSales = require('../services/servicesales');

const getSalesControler = async (_req, res) => {
    const sales = await serviceSales.getSalesServices();
    return res.status(200).json(sales);
};

const getSalesIdControler = async (req, res) => {
        const { id } = req.params;
        const salesId = await serviceSales.getSalesByIdServices(id);
        if (salesId.length > 0) return res.status(200).json(salesId);
        return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
};
