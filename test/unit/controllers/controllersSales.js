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
    describe('Quando não existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
  
      before(() => {
        request.params = {id: 20}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceSales, 'getSalesByIdServices').resolves([]);
      })
  
      after(() => {
        serviceSales.getSalesByIdServices.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 404', async () => {
        await controllerSales.getSalesIdControler(request, response)
  
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um objeto', async () => {
        await controllerSales.getSalesIdControler(request, response)
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
      it('é chamado o método "json" passando uma messagem not found', async () => {
        await controllerSales.getSalesIdControler(request, response)
        // expect(response.json).to.be.equal('Product not found');
        expect(response.json.calledWith({message: 'Sale not found'})).to.be.equal(
            true
          );
      });
    })
  
    describe('quando existem produtos com o ID especificado', async () => {
      request.params = {id: 2}
      const response = {};
      const request = {};
  
      const productsMock = [
        {
            date: "2022-05-07T01:12:42.000Z",
            productId: 3,
            quantity: 15
        }
      ]
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceSales, 'getSalesByIdServices')
          .resolves(productsMock);
      })
  
      after(() => {
        serviceSales.getSalesByIdServices.restore();
      });
  
      it('é chamado o método "status" passando o código 200', async () => {
        await controllerSales.getSalesIdControler(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array', async () => {
        await controllerSales.getSalesIdControler(request, response)
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
      it('é chamado o método "json" com valores date, productId e quantity', async () => {
        await controllerSales.getSalesIdControler(request, response)
        expect(response.json.calledWith([productsMock])).to.be.equal(true);
      });
    });
  })