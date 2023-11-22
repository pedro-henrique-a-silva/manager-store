const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const salesMocks = require('./mocks/sales.mock');

describe('Testando sales - SERVICE', function () {
  it('Testando registro de vendas bem sucedido', async function () {
    sinon.stub(salesModel, 'registerSales').resolves(5);
    sinon.stub(productsModel, 'getProductById')
      .onFirstCall()  
      .resolves({ id: 1, name: 'produto1' })
      .onSecondCall()
      .resolves({ id: 2, name: 'produto2' });

    const registerSaleData = await salesService.registerSales(salesMocks.salesToRegister);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.data).to.have.property('id');
    expect(registerSaleData.data).to.have.property('itemsSold');
  });

  it('Testando se não registra vendas caso produto não exista', async function () {
    sinon.stub(salesModel, 'registerSales').resolves(5);
    sinon.stub(productsModel, 'getProductById')
      .onFirstCall()  
      .resolves({ id: 1, name: 'produto1' })
      .onSecondCall()
      .resolves(undefined);

    const registerSaleData = await salesService.registerSales(salesMocks.salesToRegister);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.status).to.be.equal('NOT_FOUND');
    expect(registerSaleData.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});