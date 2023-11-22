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

module.exports = {
  salesRegisterFromService,
  salesToRegister,
};