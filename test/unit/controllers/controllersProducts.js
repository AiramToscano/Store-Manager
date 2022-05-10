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
    describe('Quando existem produtos no banco com o ID informado', () => {
      const response = {}
      const request = {}
      const productsMock = [
        {
          id: '1',
          name: 'Martelo de Thor',
          quantity: 10,
        }
        ]
      before(() => {
        request.params = {id: 20}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceProduct, 'getProductsByIdServices').resolves(productsMock);
      })
  
      after(() => {
          serviceProduct.getProductsByIdServices.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 200', async () => {
        await controllerProduct.getProductsIdControler(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um objeto', async () => {
        await controllerProduct.getProductsIdControler(request, response)
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })
    describe('quando cai catch', async () => {
      const objErrorNotFound = {
        error: 404,
        message: 'Product not found',
    };
      const response = {};
      const request = {};
      request.params = {id: 20}
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceProduct, 'getProductsByIdServices')
          .resolves(objErrorNotFound);
      })
  
      after(() => {
        serviceProduct.getProductsByIdServices.restore();
      });
  
      it('é chamado o método "status" passando o código 500', async () => {
        try{
        await controllerProduct.getProductsIdControler(request, response)
        } catch(err) {
        expect(response.err).to.be.equal(500);
        }
      });
      it('é chamado o método "json" passando uma messagem Product not found', async () => {
        try {
        await controllerProduct.getProductsIdControler(request, response)
        } catch (err) {
          expect(err.message).to.be.equal('Product not found');
        }
      });
    });
  });
  describe('Chamada do controller registerProduct', () => {
    describe('Quando o register ocorre com sucesso', () => {
      const response = {}
      const request = {}
    
      before(() => {
        request.body = {
          name: "pc gamer ultra mega power",
	       	quantity: 10
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceProduct, 'validCreate').resolves(true);
      })
  
      after(() => {
          serviceProduct.validCreate.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 201', async () => {
        await controllerProduct.registerProduct(request, response)
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
  
      it('é retornado o metodo json contendo um objeto', async () => {
        await controllerProduct.registerProduct(request, response)
        
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })
    describe('quando cai catch', async () => {

      const response = {};
      const request = {};
      request.params = {id: 20}
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceProduct, 'validCreate')
          .resolves([[]]);
      })
  
      after(() => {
        serviceProduct.validCreate.restore();
      });
  
      it('é chamado o método "status" passando o código 500', async () => {
        try{
        await controllerProduct.registerProduct(request, response)
        } catch(err) {
        expect(response.err).to.be.equal(500);
        }
      });
      it('é chamado o método "json" passando uma messagem sales not found', async () => {
        try {
        await controllerProduct.registerProduct(request, response)
        } catch (err) {
          expect(err.message).to.be.equal('Product not found');
        }
      });
    });
  });
  describe('Chamada do controller updateProduct', () => {
    describe('Quando a atualização ocorre com sucesso', () => {
      const response = {}
      const request = {}
      before(() => {
        request.params = {id: 2};
        request.body = {
          name: "pc gamer ultra mega power",
	       	quantity: 10
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceProduct, 'validUpdate').resolves(true);
      })
  
      after(() => {
          serviceProduct.validUpdate.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 200', async () => {
        await controllerProduct.updateProduct(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    })
    describe('quando cai catch', async () => {
      const response = {};
      const request = {};
      request.params = {id: 20}
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(serviceProduct, 'validUpdate')
          .resolves([[]]);
      })
  
      after(() => {
        serviceProduct.validUpdate.restore();
      });
  
      it('é chamado o método "status" passando o código 500', async () => {
        try{
        await controllerProduct.updateProduct(request, response)
        } catch(err) {
        expect(response.err).to.be.equal(500);
        }
      });
      it('é chamado o método "json" passando uma messagem sales not found', async () => {
        try {
        await controllerProduct.updateProduct(request, response)
        } catch (err) {
          expect(err.message).to.be.equal('Product not found');
        }
      });
    });
  });
  describe('Chamada do controller deleteProduct', () => {
    describe('Quando a atualização ocorre com sucesso', () => {
      const response = {}
      const request = {}
      before(() => {
        request.params = {id: 2};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(serviceProduct, 'validDelete').resolves(true);
      })
  
      after(() => {
          serviceProduct.validDelete.restore();
      })
  
      it('é retornado o metodo "status" passando o codigo 201', async () => {
        await controllerProduct.deleteProduct(request, response)
  
        expect(response.status.calledWith(204)).to.be.equal(true);
      })
    })
  });
