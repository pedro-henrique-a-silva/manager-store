const { productsService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const allProducts = await productsService.getAll();
  return res.status(httpMap[allProducts.status]).json(allProducts.data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.getProductById(id);

  if (products.status !== 'SUCCESS') {
    return res
      .status(httpMap[products.status]).json({ message: products.data }); 
  }
  
  return res.status(httpMap[products.status]).json(products.data);
};

const registerProd = async (req, res) => {
  const { name } = req.body;
  const insertData = await productsService.registerProd(name);

  const insertProduct = { id: insertData.data, name };
  return res.status(httpMap[insertData.status]).json(insertProduct);
};

module.exports = {
  getAll,
  getProductById,
  registerProd,
};