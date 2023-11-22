const express = require('express');
const { salesController } = require('../controllers');
const { salesMiddlewares } = require('../middlewares');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.post(
  '/', 
  salesMiddlewares.validateProductToRegister,
  salesController.registerSales,
);
salesRouter.get('/:id', salesController.getSaleById);

module.exports = salesRouter;