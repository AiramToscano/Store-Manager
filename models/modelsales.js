const connection = require('./connection');

const getSales = async () => {
   const query = `SELECT SP.sale_id AS saleId, 
   SA.date, SP.product_id AS productId, SP.quantity FROM StoreManager.sales_products AS SP 
   JOIN StoreManager.sales AS SA ON SA.id = SP.sale_id;`;
    const [sales] = await connection.execute(query);
    return sales;
};

const getSalesById = async (id) => {
    const query = `SELECT SA.date, 
    SP.product_id AS productId, SP.quantity FROM StoreManager.sales_products AS SP
    JOIN StoreManager.sales AS SA ON SA.id = SP.sale_id WHERE SA.id =?`;
    const [searchSales] = await connection.execute(query, [id]);
    return searchSales;
};

const createSales = async (date) => {
    const query = `INSERT INTO StoreManager.sales
    (date) VALUES (?)`;
    const [create] = await connection.execute(query, [date]);
    return {
        id: create.insertId,
      };
};

const createSalesProducers = async (saleid, productid, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const [create] = await connection.execute(query, [saleid, productid, quantity]);
    return {
        id: create.insertId,
      };
};

const getSalesAndProducts = async (id) => {
    const query = `SELECT product_id AS productId, quantity FROM StoreManager.sales_products 
    WHERE sale_id = ? ORDER BY productId`;
    const [searchSales] = await connection.execute(query, [id]);
    return searchSales;
};

const updateSales = async (saleid, productId, quantity) => {
    const query = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
    const [updateSale] = await connection.execute(query, [quantity, saleid, productId]);
    return updateSale;
  };

  const deleteSales = async (id) => {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [deleteSale] = await connection.execute(query, [id]);
    return deleteSale;
  };

module.exports = {
    getSales,
    getSalesById,
    createSales,
    createSalesProducers,
    getSalesAndProducts,
    updateSales,
    deleteSales,
};