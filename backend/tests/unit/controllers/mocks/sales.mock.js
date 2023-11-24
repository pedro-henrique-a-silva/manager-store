const DATA = '2023-11-24T20:42:58.000Z';

const allSalesFromService = [
  {
    saleId: 1,
    productId: 1,
    date: DATA,
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    date: DATA,
    quantity: 10,
  },
  {
    saleId: 2,
    productId: 3,
    date: DATA,
    quantity: 15,
  },
];

const getSaleByIdWithSuccess = {
  status: 'SUCCESS',
  data: [
    {
      productId: 1,
      date: '2023-11-24T20:42:58.000Z',
      quantity: 5,
    },
    {
      productId: 2,
      date: '2023-11-24T20:42:58.000Z',
      quantity: 10,
    },
  ],
};

const getSaleByIdWithFailure = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const deleteSaleByIdWithFailure = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
const deleteSaleByIdWithSuccess = { status: 'SUCCESS_NO_CONTENT', data: '' };

module.exports = {
  allSalesFromService,
  getSaleByIdWithSuccess,
  getSaleByIdWithFailure,
  deleteSaleByIdWithFailure,
  deleteSaleByIdWithSuccess,
};