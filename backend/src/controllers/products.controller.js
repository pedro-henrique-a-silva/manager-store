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

module.exports = {
  getAll,
  getProductById,
};