const { productsModel } = require('../models');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  const allProductsOrdered = allProducts.sort((a, b) => a.id - b.id);
  return allProductsOrdered;
};

module.exports = {
  getAll,
};