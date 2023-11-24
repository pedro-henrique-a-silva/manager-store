const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [allSales] = await connection.execute(`
    SELECT sale_id, product_id, date, quantity FROM sales_products sp
    INNER JOIN products p ON p.id = sp.product_id
    INNER join sales s ON s.id = sp.sale_id
  `);

  return camelize(allSales);
};

const getSaleById = async (saleId) => {
  const [sale] = await connection.execute(`
    SELECT product_id, date, quantity FROM sales_products sp
    INNER JOIN products p ON p.id = sp.product_id
    INNER join sales s ON s.id = sp.sale_id
    WHERE sale_id = ?
  `, [saleId]);

  return camelize(sale);
};

const registerSales = async (sales) => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO sales () VALUE ()
  `);

  const salesPromiseList = sales.map((sale) => (
    connection.execute(`
      INSERT INTO sales_products
      (sale_id, product_id, quantity)
      VALUES
      (?, ?, ?)
    `, [insertId, sale.productId, sale.quantity])
  ));

  await Promise.all(salesPromiseList);

  return insertId;
};

const deleteSaleById = async (saleId) => {
  await connection.execute(`
  DELETE FROM sales WHERE id = ?`, [saleId]);
};

module.exports = {
  getAll,
  getSaleById,
  registerSales,
  deleteSaleById,
};