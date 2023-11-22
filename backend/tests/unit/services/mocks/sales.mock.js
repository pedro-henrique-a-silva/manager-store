const salesRegisterFromService = { 
  status: 'CREATED', 
  data: {
    id: 5,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  }, 
};

const salesToRegister = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleByIdFromDB = [
  {
    productId: 1,
    date: '2023-11-22T21:59:09.000Z',
    quantity: 5,
  },
  {
    productId: 2,
    date: '2023-11-22T21:59:09.000Z',
    quantity: 10,
  },
];

module.exports = {
  salesRegisterFromService,
  salesToRegister,
  saleByIdFromDB,
};