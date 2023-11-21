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

module.exports = {
  getAll,
};