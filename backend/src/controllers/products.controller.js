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

  if (insertData.status !== 'CREATED') {
    return res.status(httpMap[insertData.status]).json({ message: insertData.data });
  }

  return res.status(httpMap[insertData.status]).json(insertData.data);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedProduct = await productsService.updatedProductbyId(id, name);

  return res.status(httpMap[updatedProduct.status]).json(updatedProduct.data);
};

const deletProductById = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productsService.deletProductById(id);

  return res.status(httpMap[deletedProduct.status]).json(deletedProduct.data);
};

module.exports = {
  getAll,
  getProductById,
  registerProd,
  updateProductById,
  deletProductById,
};