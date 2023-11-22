const express = require('express');
const { productsController } = require('../controllers');
const { productsMiddlewares } = require('../middlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.post(
  '/',
  productsMiddlewares.validateProductName, 
  productsController.registerProd,
);

productsRouter.get('/:id', productsController.getProductById);
productsRouter.put(
  '/:id', 
  productsMiddlewares.validateProductName, 
  productsController.updateProductById,
);

productsRouter.delete('/:id', productsController.deletProductById);

module.exports = productsRouter;