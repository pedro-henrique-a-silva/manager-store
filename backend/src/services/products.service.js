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

const registerProd = async (productName) => {
  if (productName.length < 5) {
    return { 
      status: 'UNABLE_TO_PROCESS', 
      data: '"name" length must be at least 5 characters long' };
  }

  const product = await productsModel.registerProd(productName);

  if (!product) return { status: 'NOT_FOUND', data: 'Product not found' };

  return { status: 'CREATED', data: { id: product, name: productName } };
};

module.exports = {
  getAll,
  getProductById,
  registerProd,
};