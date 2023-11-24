const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesMiddlewares } = require('../../../src/middlewares');
const salesMock = require('./mock/sales.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando sales - Middleware', function () {
  it('Testando se não e possivel cadastrar venda com sucesso', async function () {
    const req = {
      body: salesMock.salesToRegisterReqCorrect,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await salesMiddlewares.validateProductToRegister(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Testando se não e possivel cadastrar venda sem productId', async function () {
    const req = {
      body: salesMock.salesToRegisterReqWithoutProductId,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await salesMiddlewares.validateProductToRegister(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Testando se não e possivel cadastrar venda sem quantity', async function () {
    const req = {
      body: salesMock.salesToRegisterReqWithoutQuantity,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await salesMiddlewares.validateProductToRegister(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});