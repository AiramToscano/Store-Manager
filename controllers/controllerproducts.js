const { getProductsServices, getProductsByIdServices } = require('../services/serviceproducts');

const getProductsControler = async (_req, res) => {
    try {
    const products = await getProductsServices();
    res.status(200).json(products);
    } catch (err) {
        console.error(err);
    }
};

const getProductsIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const [productsId] = await getProductsByIdServices(id);
        if (productsId !== undefined) return res.status(200).json(productsId);
        return res.status(404).json({ message: 'Product not found' });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getProductsControler,
    getProductsIdControler,
};
