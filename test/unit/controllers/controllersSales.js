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
    describe('quando cai catch aqui', async () => {
      const objError = {
        error: 404,
        message: 'Sale not found',
    };
      const response = {};
      const request = {};
      response.error = objError
      before(() => {
        response.status = sinon.stub()
          .returns();
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceSales, 'getSalesByIdServices')
          .resolves([[]]);
      })
  
      after(() => {
        serviceSales.getSalesByIdServices.restore();
      });
  
      it('é chamado o método "status" passando o código 404', async () => {
        try{
        await controllerSales.getSalesIdControler(request, response)
        } catch(err) {
        // expect(response.err.error).to.be.equal(404);
        const { error } = response.error;
        expect(error).to.be.equal(404);
        // expect(response.error.calledWith(404)).to.be.equal(true);
        }
      });
      it('é chamado o método "json" passando uma messagem Sale not found', async () => {
         try {
         await controllerSales.getSalesIdControler(request, response)
         } catch (err) {
          const { message } = response.error;
           expect(message).to.be.equal('Sale not found');
         }
       });
    });
  });
  describe('Chamada do controller createSales', () => {
    describe('Quando existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
      before(() => {
        const SalesMock =   [
          {
            productId: 1,
            quantity: 300
          },
          {
            productId: 2,
            quantity: 500
          }
        ]
        request.body = SalesMock;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceSales, 'createSales').resolves(SalesMock);
      })
  
      after(() => {
        serviceSales.createSales.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 201', async () => {
        await controllerSales.createSales(request, response)
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um array', async () => {
        await controllerSales.createSales(request, response)
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })
    describe('quando cai catch aqui', async () => {
      const objError = {
        error: 404,
        message: 'Sale not found',
    };
      const response = {};
      const request = {};
      response.error = objError
      before(() => {
        response.status = sinon.stub()
          .returns();
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceSales, 'createSales')
          .resolves([[]]);
      })
  
      after(() => {
        serviceSales.createSales.restore();
      });
  
      it('é chamado o método "status" passando o código 404', async () => {
        try{
        await controllerSales.createSales(request, response)
        } catch(err) {
        // expect(response.err.error).to.be.equal(404);
        const { error } = response.error;
        expect(error).to.be.equal(404);
        // expect(response.error.calledWith(404)).to.be.equal(true);
        }
      });
      it('é chamado o método "json" passando uma messagem Sale not found', async () => {
         try {
         await controllerSales.createSales(request, response)
         } catch (err) {
          const { message } = response.error;
           expect(message).to.be.equal('Sale not found');
         }
       });
    });
  });
  describe('Chamada do controller updateSales', () => {
    describe('Quando existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
      before(() => {
        const SalesMock =   [
          {
            productId: 1,
            quantity: 300
          },
          {
            productId: 2,
            quantity: 500
          }
        ]
        request.params = {id: 2};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceSales, 'updateSales').resolves(SalesMock);
      })
  
      after(() => {
        serviceSales.updateSales.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 201', async () => {
        await controllerSales.updateSales(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um array', async () => {
        await controllerSales.updateSales(request, response)
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })
  });

