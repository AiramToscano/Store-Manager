const serviceProduct = require('../services/serviceproducts');

const getProductsControler = async (_req, res) => {
    try {
    const products = await serviceProduct.getProductsServices();
    res.status(200).json(products);
    } catch (err) {
        console.error(err);
    }
};

const getProductsIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        // const productsIdteste = await serviceProduct.getProductsByIdServices(id);
        // console.log(productsIdteste);
        const [productsId] = await serviceProduct.getProductsByIdServices(id);
        if (productsId !== undefined) return res.status(200).json(productsId);
        return res.status(404).json({ message: 'Product not found' });
    } catch (err) { // como eu trato o erro do try cacth
        console.error(err);
    }
};

const registerProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const register = await serviceProduct.validCreate(name, quantity);
    if (!register) {
        return res.status(409).json({ message: 'Product already exists' });
    }
    const ojbProduct = {
        id: register,
        name, 
        quantity,
    };
    res.status(201).json(ojbProduct);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const uptade = await serviceProduct.validUpdate(id, name, quantity);
    if (!uptade) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(uptade);
};

module.exports = {
    getProductsControler,
    getProductsIdControler,
    registerProduct,
    updateProduct,
};
