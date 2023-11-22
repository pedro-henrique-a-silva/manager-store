const registerProductFromServiceSuccess = {
  status: 'CREATED',
  data: { id: 5, name: 'Produto legal' },
};

const registerProductNameLengthSmallerThanFive = { 
  status: 'UNABLE_TO_PROCESS', 
  data: '"name" length must be at least 5 characters long', 
};

module.exports = {
  registerProductFromServiceSuccess,
  registerProductNameLengthSmallerThanFive,
};