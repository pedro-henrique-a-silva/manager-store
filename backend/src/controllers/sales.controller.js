const { salesService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const allSales = await salesService.getAll();
  return res.status(httpMap[allSales.status]).json(allSales.data);
};

module.exports = {
  getAll,
};