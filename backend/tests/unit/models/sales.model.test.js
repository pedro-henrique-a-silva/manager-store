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

  afterEach(function () {
    sinon.restore();
  });
});