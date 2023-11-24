const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const connection = require('../../src/models/connection');

const productsMock = require('./mocks/products.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste Integração Rotas de produtos', function () {
  it('Testando rota /products de listagem de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.allProductsFromDB]);
    const response = await chai
      .request(app)
      .get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  afterEach(sinon.restore);
});