const { productsModel } = require('../models');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  const allProductsOrdered = allProducts.sort((a, b) => a.id - b.id);
  
  return { status: 'SUCCESS', data: allProductsOrdered };
};

const getProductById = async (productId) => {
  const product = await productsModel.getProductById(productId);

  if (!product) return { status: 'NOT_FOUND', data: 'Product not found' };

  return { status: 'SUCCESS', data: product };
};

module.exports = {
  getAll,
  getProductById,
};