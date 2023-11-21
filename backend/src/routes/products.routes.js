const express = require('express');
const { productsModel } = require('../models');

const productsRouter = express.Router();

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModel.getAll();
  res.status(200).json(allProducts);
});

module.exports = productsRouter;