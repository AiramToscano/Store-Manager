const serviceSales = require('../services/servicesales');

const getSalesControler = async (_req, res) => {
    const sales = await serviceSales.getSalesServices();
    return res.status(200).json(sales);
};

const getSalesIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const verific = serviceSales.isNum(id);
        console.log(verific);
        const salesId = await serviceSales.getSalesByIdServices(id);
        console.log(salesId);
        if (salesId.length > 0) return res.status(200).json(salesId);
        return res.status(404).json({ message: 'Sale not found' });
    } catch (err) {
         return res.status(500).json({ error: err.message });
        }
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
};
