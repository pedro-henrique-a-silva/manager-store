const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsMiddlewares } = require('../../../src/middlewares');
// const salesMock = require('./mock/sales.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando Products - Middleware', function () {
  it('Testando validação de nome de produto - sucesso', async function () {
    const req = {
      body: {
        name: 'Produto ok',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await productsMiddlewares.validateProductName(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testando validação de nome de produto - falhando', async function () {
    const req = {
      body: {
        name: '',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    await productsMiddlewares.validateProductName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).to.have.not.been.calledWith();
  });
  
  afterEach(function () {
    sinon.restore();
  });
});