const registerProductFromServiceSuccess = {
  status: 'CREATED',
  data: { id: 5, name: 'Produto legal' },
};

const registerProductNameLengthSmallerThanFive = { 
  status: 'UNABLE_TO_PROCESS', 
  data: '"name" length must be at least 5 characters long', 
};

const productDeletedWithSuccess = { status: 'SUCCESS_NO_CONTENT', data: '' };

const productDeletedError = { status: 'NOT_FOUND', data: { message: 'Product not found' } };

const productByIdFromService = { status: 'SUCCESS', data: { id: 1, name: 'Martelo de Thor' } };
module.exports = {
  registerProductFromServiceSuccess,
  registerProductNameLengthSmallerThanFive,
  productDeletedWithSuccess,
  productDeletedError,
  productByIdFromService,
};