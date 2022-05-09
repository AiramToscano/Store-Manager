const connection = require('./connection');

const getProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products ORDER BY id';
    const [products] = await connection.execute(query);
    return products;
};

const getProductsById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [searchProducts] = await connection.execute(query, [id]);
    // console.log(searchProducts);
    return searchProducts;
};

const createProducts = async (name, quantity) => {
    const query = `INSERT INTO StoreManager.products 
    (name, quantity) VALUES (?, ?)`;
    const [createProduct] = await connection.execute(query, [name, quantity]);
    return createProduct;
};

const updateProducts = async (id, name, quantity) => {
    const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
    const [updateProduct] = await connection.execute(query, [name, quantity, id]);
    return updateProduct;
  };
module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
};
