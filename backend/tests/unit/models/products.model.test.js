const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsFromDB } = require('./mocks/products.mock');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Testando products - MODEL', function () {
  it('Testando retorno todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    const allProducts = await productsModel.getAll();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.have.lengthOf(3);
  });
});