const { salesModel } = require('../models');
const { productsModel } = require('../models');

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return { status: 'SUCCESS', data: allSales };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.getSaleById(saleId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: 'Sale not found' };

  return { status: 'SUCCESS', data: sale };
};

const registerSales = async (sales) => {
  const salesPromise = sales.map((sale) => productsModel.getProductById(sale.productId));
  const salesResultado = await Promise.all(salesPromise);

  const salesFiltered = sales.filter((_sale, index) => salesResultado[index]);

  if (salesFiltered.length !== sales.length) {
    return { 
      status: 'NOT_FOUND', 
      data: { message: 'Product not found' } }; 
  }

  const insertId = await salesModel.registerSales(salesFiltered);
  const returnMessage = {
    id: insertId,
    itemsSold: salesFiltered,
  };

  return { status: 'CREATED', data: returnMessage };
};

module.exports = {
  getAll,
  getSaleById,
  registerSales,
};