const { salesService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const allSales = await salesService.getAll();
  return res.status(httpMap[allSales.status]).json(allSales.data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getSaleById(id);

  if (products.status !== 'SUCCESS') {
    return res
      .status(httpMap[products.status]).json({ message: products.data }); 
  }
  
  return res.status(httpMap[products.status]).json(products.data);
};

module.exports = {
  getAll,
  getSaleById,
};