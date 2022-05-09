const sinon = require('sinon');
const { expect } = require('chai');
const serviceproducts = require('../../../services/serviceproducts');
const modelProducts = require('../../../models/modelproducts')

describe('Busca todos os products na camada Model', () => {
    describe('quando não existe nenhum produto', () => {

        before(() => {
            sinon.stub(modelProducts, 'getProducts')
              .resolves([]);
          });
          after(() => {
            modelProducts.getProducts.restore();
          });
        it('retorna um array', async () => {
            const result = await serviceproducts.getProductsServices();
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await serviceproducts.getProductsServices();
            expect(result).to.be.empty;
        })
    })
    describe('quando existe products na minha camada model', () => {
     const result = [
        {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        },
     ]
     before(() => {
        sinon.stub(modelProducts, 'getProducts').resolves(result);
     })
     after(() => {
        modelProducts.getProducts.restore();
     })
     it('retorna um array', async () => {
        const result = await serviceproducts.getProductsServices();
        expect(result).to.be.an('array');
     })
     it('o array não esta vazio', async () => {
        const result = await serviceproducts.getProductsServices();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await serviceproducts.getProductsServices();
        expect(result).to.be.an('object');
      })
      it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
        const [result] = await serviceproducts.getProductsServices();
        expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity',
        )
      })
    })
})

describe('Busca um products por ID especifico na camada model', () => {
    describe('Quando não existe o ID especificado', () => {
        const result = [];
        const id = 20;
        before(() => {
            sinon.stub(modelProducts, 'getProductsById').resolves(result);
        })
        after(() => {
            modelProducts.getProductsById.restore();
        })
        it('retorna um array', async () => {
            const result = await serviceproducts.getProductsByIdServices(id);
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await serviceproducts.getProductsByIdServices(id);
            expect(result).to.be.empty;
        })
    })
    describe('Quando existe products com ID na minha camada model', () => {
        const id = 1;
        const result = [
           {
               id: 1,
               name: "Martelo de Thor",
               quantity: 10
           },
        ]
        before(() => {
           sinon.stub(modelProducts, 'getProductsById').resolves(result);
        })
        after(() => {
            modelProducts.getProductsById.restore();
        })
        it('retorna um array', async () => {
           const result = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.an('array');
        })
        it('o array não esta vazio', async () => {
           const result = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.not.empty;
         })
         it('o array possui objetos', async () => {
           const [result] = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.an('object');
         })
         it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
           const [result] = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.includes.all.keys(
             'id',
             'name',
             'quantity',
           )
         })
       })
})