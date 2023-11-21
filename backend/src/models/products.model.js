const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

module.exports = {
  getAll,
  getProductById,
};