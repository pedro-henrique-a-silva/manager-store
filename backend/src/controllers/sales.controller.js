const { salesService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const allSales = await salesService.getAll();
  return res.status(httpMap[allSales.status]).json(allSales.data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.status !== 'SUCCESS') {
    return res
      .status(httpMap[sale.status]).json({ message: sale.data }); 
  }
  
  return res.status(httpMap[sale.status]).json(sale.data);
};

const registerSales = async (req, res) => {
  const insertedSales = await salesService.registerSales(req.body);
  return res.status(httpMap[insertedSales.status]).json(insertedSales.data);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSaleById(id);
  
  return res.status(httpMap[response.status]).json(response.data);
};

module.exports = {
  getAll,
  getSaleById,
  registerSales,
  deleteSaleById,
};