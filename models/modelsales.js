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
    return create;
};

const getSalesAndProducts = async (id) => {
    const query = `SELECT SP.product_id 
    AS productId, SP.quantity FROM StoreManager.sales_products AS SP
    JOIN StoreManager.sales AS SA ON SA.id = SP.sale_id WHERE SA.id =?`;
    const [searchSales] = await connection.execute(query, [id]);
    return searchSales;
};

module.exports = {
    getSales,
    getSalesById,
    createSales,
    createSalesProducers,
    getSalesAndProducts,
};