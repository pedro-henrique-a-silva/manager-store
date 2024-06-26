const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', routes.productsRouter);
app.use('/sales', routes.salesRouter);

module.exports = app;
