const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return camelize(allProducts);
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return camelize(product);
};

const registerProd = async (prodName) => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO products
    (name) 
    VALUES
    (?)
  `, [prodName]);

  return insertId;
};

const updatedProductbyId = async (productId, productName) => {
  const [{ affectedRows }] = await connection.execute(`
    UPDATE products
    SET name = ?
    WHERE id = ?
  `, [productName, productId]);

  return affectedRows;
};

const deletProductById = async (productId) => {
  await connection.execute(`
  DELETE FROM products WHERE id = ?`, [productId]);
};

module.exports = {
  getAll,
  getProductById,
  registerProd,
  updatedProductbyId,
  deletProductById,
};