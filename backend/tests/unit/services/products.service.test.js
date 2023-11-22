const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const productsMocks = require('./mocks/products.mock');

describe('Testando products - SERVICE', function () {
  it('Testando camada service de busca por todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsMocks.allProductsFromDB);

    const allProducts = await productsService.getAll();

    expect(allProducts).to.have.property('status');
    expect(allProducts).to.have.property('data');
    expect(allProducts.status).to.be.equal('SUCCESS');
    expect(allProducts.data).to.deep.be.equal(productsMocks.allProductsFromDB);
  });

  it('Testando camada service, busca de produto por id, se retorna produto quando existente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(productsMocks.productFromDB);

    const product = await productsService.getProductById('1');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equal('SUCCESS');
    expect(product.data).to.deep.be.equal(productsMocks.productFromDB);
  });
  
  it('Testando camada service, busca de produto por id, se não retorna produto quando id não existe', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

    const product = await productsService.getProductById(999);

    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.equal('Product not found');
  });

  it('Testando Registro de produtos', async function () {
    sinon.stub(productsModel, 'registerProd').resolves(5);

    const product = await productsService.registerProd('Novo produto');

    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equal('CREATED');
    expect(product.data.id).to.be.equal(5);
  });

  it('Testando atualização de produtos', async function () {
    sinon.stub(productsModel, 'updatedProductbyId').resolves(1);
    sinon.stub(productsModel, 'getProductById').resolves({ id: 1, name: 'martelo thor' });

    const updatedProduct = await productsService.updatedProductbyId(1, 'Novo martelo thor');

    expect(updatedProduct).to.have.property('status');
    expect(updatedProduct).to.have.property('data');
    expect(updatedProduct.status).to.be.equal('SUCCESS');
    expect(updatedProduct.data.id).to.be.equal(1);
    expect(updatedProduct.data.name).to.be.equal('Novo martelo thor');
  });

  afterEach(function () {
    sinon.restore();
  });
});