const serviceSales = require('../services/servicesales');
const middlewaresSales = require('../middlewares/middlewaresSales');

const getSalesControler = async (_req, res) => {
    const sales = await serviceSales.getSalesServices();
    return res.status(200).json(sales);
};

const getSalesIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const verific = middlewaresSales.isNum(id);
        if (verific) {
        const salesId = await serviceSales.getSalesByIdServices(id);
        if (salesId.length > 0) return res.status(200).json(salesId);
        return res.status(404).json({ message: 'Sale not found' });
        }
        return res.status(500).json({ error: 'Rota invalida' });
    } catch (err) {
         return res.status(500).json({ error: err.message });
        }
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
};
