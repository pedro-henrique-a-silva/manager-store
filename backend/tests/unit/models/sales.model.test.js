const { expect } = require('chai');
const sinon = require('sinon');
const salesMock = require('./mocks/sales.mock');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Testando sales - MODEL', function () {
  it('Testando retorno busca de todas as  vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.allSalesFromDB]);
    const allSales = await salesModel.getAll();
    
    expect(allSales).to.be.an('array');
    expect(allSales).to.have.lengthOf(3);
  });

  it('Testando busca de vendas por id retorna vendas quando ela/elas existem', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.salesByIdFromDB]);
    const sale = await salesModel.getSaleById(1);

    expect(sale).to.be.an('array');
    expect(sale).to.have.lengthOf(2);
  });

  it('Testando busca de vendas por id não retorna vendas quando ela/elas não existem', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const sale = await salesModel.getSaleById(999);

    expect(sale).to.be.an('array');
    expect(sale).to.have.lengthOf(0);
  });

  afterEach(function () {
    sinon.restore();
  });
});