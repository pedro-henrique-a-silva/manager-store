const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const {
  registerProductFromServiceSuccess,
  registerProductNameLengthSmallerThanFive,
  productDeletedWithSuccess,
  productDeletedError,
  productByIdFromService,
} = require('./mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Testando products - CONTROLLER', function () {
  it('Testando registro de produtos com sucesso', async function () {
    sinon.stub(productsService, 'registerProd').resolves(registerProductFromServiceSuccess);
    const req = {
      body: { name: 'Produto legal' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerProd(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(registerProductFromServiceSuccess.data);
  });

  it('Testando busca de produtos por Id', async function () {
    sinon.stub(productsService, 'getProductById').resolves(productByIdFromService);
    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith();
  });

  it('Testando se busca de produtos por Id que não existe falha', async function () {
    sinon.stub(productsService, 'getProductById').resolves({ status: 'NOT_FOUND', data: 'Product not found' });
    const req = {
      params: { id: 1999 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith();
  });

  it('Testando registro de produtos falhando  com com nome com menos de 5 caracteres', async function () {
    sinon.stub(productsService, 'registerProd').resolves(registerProductNameLengthSmallerThanFive);
    const req = {
      body: { name: 'Pro' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const returnMessage = {
      message: registerProductNameLengthSmallerThanFive.data,
    };

    await productsController.registerProd(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(returnMessage);
  });

  it('Testando se é posssivel deletar um produto com sucesso', async function () {
    sinon.stub(productsService, 'deletProductById').resolves(productDeletedWithSuccess);
    const req = {
      params: { id: '1' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deletProductById(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('Testando se não é posssivel deletar um produto que não exista', async function () {
    sinon.stub(productsService, 'deletProductById').resolves(productDeletedError);
    const req = {
      params: { id: '1' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deletProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});