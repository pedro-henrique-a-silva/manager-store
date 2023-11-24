const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const salesMock = require('./mocks/sales.mock');

chai.use(sinonChai);

describe('Testando Sales - CONTROLLER', function () {
  it('Testando listagem de todas as vendas', async function () {
    sinon.stub(salesService, 'getAll')
      .resolves({ status: 'SUCCESS', data: salesMock.allSalesFromService });

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.allSalesFromService);
  });

  it('Testando busca de venda por id', async function () {
    sinon.stub(salesService, 'getSaleById')
      .resolves(salesMock.getSaleByIdWithSuccess);

    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.getSaleByIdWithSuccess.data);
  });

  it('Testando busca de venda por id sem sucesso', async function () {
    sinon.stub(salesService, 'getSaleById')
      .resolves(salesMock.getSaleByIdWithFailure);

    const req = {
      params: {
        id: 10,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesMock.getSaleByIdWithFailure.data);
  });

  it('Testando exclusão de venda por id com sucesso', async function () {
    const deleteSaleByIdStub = sinon.stub(salesService, 'deleteSaleById')
      .resolves(salesMock.deleteSaleByIdWithSuccess);

    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSaleById(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(salesMock.deleteSaleByIdWithSuccess.data);
    expect(deleteSaleByIdStub).to.have.been.calledWith(1);
  });

  it('Testando exclusão de venda por id falhando', async function () {
    const deleteSaleByIdStub = sinon.stub(salesService, 'deleteSaleById')
      .resolves(salesMock.deleteSaleByIdWithFailure);

    const req = {
      params: {
        id: 999,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesMock.deleteSaleByIdWithFailure.data);
    expect(deleteSaleByIdStub).to.have.been.calledWith(999);
  });

  afterEach(function () {
    sinon.restore();
  });
});