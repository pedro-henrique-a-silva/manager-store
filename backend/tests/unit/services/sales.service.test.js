const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesModel } = require('../../../src/models');
const { productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const salesMocks = require('./mocks/sales.mock');

const { expect } = chai;

chai.use(sinonChai);

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

  it('Testando busca de dados de vendas por id ', async function () {
    const getSaleByidStub = sinon.stub(salesModel, 'getSaleById').resolves(salesMocks.saleByIdFromDB);

    const registerSaleData = await salesService.getSaleById(1);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.status).to.be.equal('SUCCESS');
    expect(registerSaleData.data).to.be.deep.equal(salesMocks.saleByIdFromDB);
    expect(getSaleByidStub).to.have.been.calledWith(1);
  });

  it('Testando busca de dados de vendas por id dando erro ', async function () {
    const getSaleByidStub = sinon.stub(salesModel, 'getSaleById').resolves([]);

    const registerSaleData = await salesService.getSaleById(999);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.status).to.be.equal('NOT_FOUND');
    expect(getSaleByidStub).to.have.been.calledWith(999);
  });

  it('Testando exclusão de venda por id com sucesso', async function () {
    const getSaleByidStub = sinon.stub(salesModel, 'getSaleById').resolves(salesMocks.saleByIdFromDB);
    const deleteSaleByIdStub = sinon.stub(salesModel, 'deleteSaleById').resolves();

    const registerSaleData = await salesService.deleteSaleById(1);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.status).to.be.equal('SUCCESS_NO_CONTENT');
    expect(getSaleByidStub).to.have.been.calledWith(1);
    expect(deleteSaleByIdStub).to.have.been.calledWith(1);
  });

  it('Testando exclusão de venda por id sem sucesso', async function () {
    const getSaleByidStub = sinon.stub(salesModel, 'getSaleById').resolves([]);
    const registerSaleData = await salesService.deleteSaleById(999);

    expect(registerSaleData).to.have.property('status');
    expect(registerSaleData).to.have.property('data');
    expect(registerSaleData.status).to.be.equal('NOT_FOUND');
    expect(registerSaleData.data).to.be.deep.equal({ message: 'Sale not found' });
    expect(getSaleByidStub).to.have.been.calledWith(999);
  });

  afterEach(function () {
    sinon.restore();
  });
});