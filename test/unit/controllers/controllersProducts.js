const sinon = require('sinon');
const { expect } = require('chai');

const serviceProduct = require('../../../services/serviceproducts');
const controllerProduct = require('../../../controllers/controllerproducts');

// req, res, next

describe('Chamada do controller getProductsControler', () => {
  describe('Quando não existem produtos no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceProduct, 'getProductsServices').resolves([]);
    })

    after(() => {
        serviceProduct.getProductsServices.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await controllerProduct.getProductsControler(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await controllerProduct.getProductsControler(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productsMock = [
    {
      id: '1',
      name: 'Martelo de Thor',
      quantity: 10,
    }
    ]
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(serviceProduct, 'getProductsServices')
        .resolves(productsMock);
    })

    after(() => {
        serviceProduct.getProductsServices.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
        await controllerProduct.getProductsControler(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
        await controllerProduct.getProductsControler(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
})

describe('Chamada do controller getProductsIdControler', () => {
    describe('Quando não existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
  
      before(() => {
        request.params = {id: 20}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceProduct, 'getProductsByIdServices').resolves([]);
      })
  
      after(() => {
          serviceProduct.getProductsByIdServices.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 404', async () => {
        await controllerProduct.getProductsIdControler(request, response)
  
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um objeto', async () => {
        await controllerProduct.getProductsIdControler(request, response)
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
      it('é chamado o método "json" passando uma messagem not found', async () => {
        await controllerProduct.getProductsIdControler(request, response)
        // expect(response.json).to.be.equal('Product not found');
        expect(response.json.calledWith({message: 'Product not found'})).to.be.equal(
            true
          );
      });
    })
  
    describe('quando existem produtos com o ID especificado', async () => {
      request.params = {id: 1}
      const response = {};
      const request = {};
  
      const productsMock = [
      {
        id: '1',
        name: 'Martelo de Thor',
        quantity: 10,
      }
      ]
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceProduct, 'getProductsByIdServices')
          .resolves(productsMock);
      })
  
      after(() => {
          serviceProduct.getProductsByIdServices.restore();
      });
  
      it('é chamado o método "status" passando o código 200', async () => {
        await controllerProduct.getProductsIdControler(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array', async () => {
        await controllerProduct.getProductsIdControler(request, response)
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
      it('é chamado o método "json" com valores id, name e quantity', async () => {
        await controllerProduct.getProductsIdControler(request, response)
        expect(response.json.calledWith([productsMock])).to.be.equal(true);
      });
    });
  })