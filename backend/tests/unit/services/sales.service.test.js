const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const salesMocks = require('./mocks/products.mock');

describe('Testando sales - SERVICE', function () {
  it('Testando registro de vendas bem sucedido', async function () {
    sinon.stub(salesModel, 'registerSales').resolves(5);

    const registerSaleData = await salesService.registerSales(salesMocks.salesToRegister);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.data).to.have.property('id');
    expect(registerSaleData.data).to.have.property('itemsSold');
  });
});