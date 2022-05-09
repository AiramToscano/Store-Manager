const { expect } = require('chai');
const sinon = require('sinon');
const modelproducts = require('../../../models/modelproducts');
const connection = require('../../../models/connection');

describe('Busca todos os products no BD', () => {
    describe('quando não existe nenhum produto', () => {
        const result = [[]];
        before(() => {
            sinon.stub(connection, 'execute').resolves(result);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
            const result = await modelproducts.getProducts();
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await modelproducts.getProducts();
            expect(result).to.be.empty;
        })
    })
    describe('quando existe products no meu banco', () => {
     const result = [
        {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        },
     ]
     before(() => {
        sinon.stub(connection, 'execute').resolves([result]);
     })
     after(() => {
         connection.execute.restore();
     })
     it('retorna um array', async () => {
        const result = await modelproducts.getProducts();
        expect(result).to.be.an('array');
     })
     it('o array não esta vazio', async () => {
        const result = await modelproducts.getProducts();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await modelproducts.getProducts();
        expect(result).to.be.an('object');
      })
      it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
        const [result] = await modelproducts.getProducts();
        expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity',
        )
      })
    })
})

describe('Busca um products por ID especifico', () => {
    describe('Quando não existe o ID especificado', () => {
        const result = [[]];
        const id = 20;
        before(() => {
            sinon.stub(connection, 'execute').resolves(result);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
            const result = await modelproducts.getProductsById(id);
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await modelproducts.getProductsById(id);
            expect(result).to.be.empty;
        })
    })
    describe('Quando existe products com ID no meu banco', () => {
        const id = 1;
        const result = [
           {
               id: 1,
               name: "Martelo de Thor",
               quantity: 10
           },
        ]
        before(() => {
           sinon.stub(connection, 'execute').resolves([result]);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
           const result = await modelproducts.getProductsById(id);
           expect(result).to.be.an('array');
        })
        it('o array não esta vazio', async () => {
           const result = await modelproducts.getProductsById(id);
           expect(result).to.be.not.empty;
         })
         it('o array possui objetos', async () => {
           const [result] = await modelproducts.getProductsById(id);
           expect(result).to.be.an('object');
         })
         it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
           const [result] = await modelproducts.getProductsById(id);
           expect(result).to.be.includes.all.keys(
             'id',
             'name',
             'quantity',
           )
         })
       })
})