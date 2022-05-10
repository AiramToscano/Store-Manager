const sinon = require('sinon');
const { expect } = require('chai');

const serviceSales = require('../../../services/servicesales');
const controllerSales = require('../../../controllers/controllersales');

// req, res, next

describe('Chamada do controller getSalesControler', () => {
  describe('Quando não existem produtos no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceSales, 'getSalesServices').resolves([]);
    })

    after(() => {
        serviceSales.getSalesServices.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await controllerSales.getSalesControler(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
        await controllerSales.getSalesControler(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    const productsMock = [
        {
            saleId: 1,
            date: "2022-05-07T01:12:42.000Z",
            productId: 1,
            quantity: 5
        },
    ]
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(serviceSales, 'getSalesServices')
        .resolves(productsMock);
    })

    after(() => {
        serviceSales.getSalesServices.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
        await controllerSales.getSalesControler(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
        await controllerSales.getSalesControler(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
  })
  describe('Chamada do controller getSalesIdControler', () => {
    describe('Quando existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
      const SalesMock = [
        {
          date: "2022-05-10T22:31:09.000Z",
          productId: 3,
          quantity: 15
        }
        ]
      before(() => {
        request.params = {id: 1}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceSales, 'getSalesByIdServices').resolves(SalesMock);
      })
  
      after(() => {
        serviceSales.getSalesByIdServices.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 200', async () => {
        await controllerSales.getSalesIdControler(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um array', async () => {
        await controllerSales.getSalesIdControler(request, response)
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })
    describe('quando cai catch', async () => {
      const objError = {
        error: 404,
        message: 'Sale not found',
    };
      const response = {};
      const request = {};
      request.params = {id: 20}
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceSales, 'getSalesByIdServices')
          .resolves(objError);
      })
  
      after(() => {
        serviceSales.getSalesByIdServices.restore();
      });
  
      it('é chamado o método "status" passando o código 500', async () => {
        try{
        await controllerSales.getSalesIdControler(request, response)
        } catch(err) {
        expect(response.err.error).to.be.equal(404);
        }
      });
      it('é chamado o método "json" passando uma messagem Product not found', async () => {
        try {
        await controllerSales.getSalesIdControler(request, response)
        } catch (err) {
          expect(response.err.message).to.be.equal('Sale not found');
        }
      });
    });
  });
