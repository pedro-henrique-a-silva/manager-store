const DATA_VENDA = '2023-11-21T20:11:59.000Z';

const allSalesFromDB = [
  {
    saleId: 1,
    productId: 1,
    date: DATA_VENDA,
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    date: DATA_VENDA,
    quantity: 10,
  },
  {
    saleId: 2,
    productId: 3,
    date: DATA_VENDA,
    quantity: 15,
  },
];

const salesByIdFromDB = [
  {
    saleId: 1,
    productId: 1,
    date: '2023-11-21T20:11:59.000Z',
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    date: '2023-11-21T20:11:59.000Z',
    quantity: 10,
  },
];

module.exports = {
  allSalesFromDB,
  salesByIdFromDB,
};