const { salesModel } = require('../models');

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return { status: 'SUCCESS', data: allSales };
};

module.exports = {
  getAll,
};