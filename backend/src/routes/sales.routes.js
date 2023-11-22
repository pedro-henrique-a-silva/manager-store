const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.post('/', salesController.registerSales);
salesRouter.get('/:id', salesController.getSaleById);

module.exports = salesRouter;