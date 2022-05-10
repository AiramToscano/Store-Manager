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

module.exports = {
    getSalesControler,
    getSalesIdControler,
};
