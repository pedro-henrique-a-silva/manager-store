const { expect } = require('chai');
const sinon = require('sinon');
const productsMock = require('./mocks/products.mock');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Testando products - MODEL', function () {
  it('Testando retorno todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.allProductsFromDB]);
    const allProducts = await productsModel.getAll();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.have.lengthOf(3);
  });

  it('Testando busca de produto por id retorna produto quando ele existe', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock.productFromDB]]);
    const product = await productsModel.getProductById(1);

    expect(product).to.have.property('name');
    expect(product).to.have.property('id');
    expect(product.id).to.be.equal(1);
    expect(product.name).to.be.equal('Martelo de Thor');
  });

  it('Testando busca de produto por id não retorna produto quando ele não existe', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    const product = await productsModel.getProductById(999);

    expect(product).to.be.an('undefined');
  });

  it('Testando cadastro de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.createdProduct]);
    const insertId = await productsModel.registerProd('novo produto');

    expect(insertId).to.be.equal(5);
  });

  it('Testando atualização de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.updatedProduct]);
    const affectedRows = await productsModel.updatedProductbyId(1, 'novo produto');

    expect(affectedRows).to.be.equal(1);
  });

  it('Testando exclusão de produtos com sucesso', async function () {
    const deleteFunc = sinon.stub(connection, 'execute').resolves();
    await productsModel.deletProductById(1);

    expect(deleteFunc).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});