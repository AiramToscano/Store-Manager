const connection = require('./connection');

const getProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products ORDER BY id';
    const [products] = await connection.execute(query);
    return products;
};

const getProductsById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [searchProducts] = await connection.execute(query, [id]);
    return searchProducts;
};

module.exports = {
    getProducts,
    getProductsById,
};
