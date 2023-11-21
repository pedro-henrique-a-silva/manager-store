const { salesModel } = require('../models');

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return { status: 'SUCCESS', data: allSales };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.getSaleById(saleId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: 'Sale not found' };

  return { status: 'SUCCESS', data: sale };
};

module.exports = {
  getAll,
  getSaleById,
};