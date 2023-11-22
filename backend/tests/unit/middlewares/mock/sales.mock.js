const salesToRegisterReqCorrect = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesToRegisterReqWithoutProductId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesToRegisterReqWithoutQuantity = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  salesToRegisterReqCorrect,
  salesToRegisterReqWithoutProductId,
  salesToRegisterReqWithoutQuantity,
};