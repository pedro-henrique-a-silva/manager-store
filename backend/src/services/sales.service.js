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

const registerSales = async (sales) => {
  const insertId = await salesModel.registerSales(sales);

  const returnMessage = {
    id: insertId,
    itemsSold: sales,
  };

  return { status: 'CREATED', data: returnMessage };
};

module.exports = {
  getAll,
  getSaleById,
  registerSales,
};