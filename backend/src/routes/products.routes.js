const express = require('express');
const { productsController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.post('/', productsController.registerProd);

productsRouter.get('/:id', productsController.getProductById);

module.exports = productsRouter;