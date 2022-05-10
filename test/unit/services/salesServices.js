const { expect } = require('chai');
const sinon = require('sinon');
const modelsales = require('../../../models/modelsales');
const servicesSales = require('../../../services/servicesales')

describe('Busca todos as vendas na camada model', () => {
    describe('quando não existe nenhuma venda', () => {
        const result = [];
        before(() => {
            sinon.stub(modelsales, 'getSales').resolves(result);
        })
        after(() => {
            modelsales.getSales.restore();
        })
        it('retorna um array', async () => {
            const result = await servicesSales.getSalesServices();
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await servicesSales.getSalesServices();
            expect(result).to.be.empty;
        })
    })
    describe('quando existe vendas no meu banco', () => {
     const result = [
        {
            saleId: 1,
            date: "2022-05-07T01:12:42.000Z",
            productId: 1,
            quantity: 5
        },
     ]
     before(() => {
        sinon.stub(modelsales, 'getSales').resolves(result);
     })
     after(() => {
        modelsales.getSales.restore();
     })
     it('retorna um array', async () => {
        const result = await servicesSales.getSalesServices();
        expect(result).to.be.an('array');
     })
     it('o array não esta vazio', async () => {
        const result = await servicesSales.getSalesServices();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await servicesSales.getSalesServices();
        expect(result).to.be.an('object');
      })
      it('o objeto que esta no array contem os atributos saleId, date, productId, quantity', async () => {
        const [result] = await servicesSales.getSalesServices();
        expect(result).to.be.includes.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity'
        )
      })
    })
})

describe('Busca uma venda por ID especifico', () => {
    describe('Quando não existe a venda com o ID especificado', () => {
        const result = [[]];
        const id = 20;
        before(() => {
            sinon.stub(modelsales, 'getSalesById').resolves(result);
        })
        after(() => {
            modelsales.getSalesById.restore();
        })
        it('retorna um array', async () => {
            const result = await servicesSales.getSalesByIdServices(id);
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const [result] = await servicesSales.getSalesByIdServices(id);
            expect(result).to.be.empty;
        })
    })
    describe('Quando existe a venda com ID no meu banco', () => {
        const saleId = 1;
        const result = [
            {
                date: "2022-05-07T01:12:42.000Z",
                productId: 1,
                quantity: 5
            },
         ]
        before(() => {
           sinon.stub(modelsales, 'getSalesById').resolves(result);
        })
        after(() => {
            modelsales.getSalesById.restore();
        })
        it('retorna um array', async () => {
            const result = await servicesSales.getSalesByIdServices(saleId);
           expect(result).to.be.an('array');
        })
        it('o array não esta vazio', async () => {
            const result = await servicesSales.getSalesByIdServices(saleId);
           expect(result).to.be.not.empty;
         })
         it('o array possui objetos', async () => {
            const [result] = await servicesSales.getSalesByIdServices(saleId);
           expect(result).to.be.an('object');
         })
         it('o objeto que esta no array contem os atributos date, productId, quantity', async () => {
            const [result] = await servicesSales.getSalesByIdServices(saleId);
            expect(result).to.be.includes.all.keys(
              'date',
              'productId',
              'quantity'
            )
          })
       })
       describe('Quando Não existe a venda com ID no meu banco e retorna um erro', () => {
        const saleId = 1;
        const objError = [{
                error: 404,
                message: 'Sale not Found',
            }];
        
        before(() => {
           sinon.stub(modelsales, 'getSalesById').resolves(objError);
        })
        after(() => {
            modelsales.getSalesById.restore();
        })
        it('retorna um objeto', async () => {
            const [result] = await servicesSales.getSalesByIdServices(saleId);
           expect(result).to.be.an('object');
        })
        it('o objeto não esta vazio', async () => {
            const result = await servicesSales.getSalesByIdServices(saleId);
           expect(result).to.be.not.empty;
         })
         it('o objeto contem os atributos error, message', async () => {
            const [result] = await servicesSales.getSalesByIdServices(saleId);
            expect(result).to.be.includes.all.keys(
              'error',
              'message',
            )
          })
       })
})