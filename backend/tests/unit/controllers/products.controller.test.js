const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const {
  registerProductFromServiceSuccess,
  registerProductNameLengthSmallerThanFive,
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

  it('Testando registro de produtos com falhando com nome com menos de 5 caracteres', async function () {
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

  afterEach(function () {
    sinon.restore();
  });
});