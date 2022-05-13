const { expect } = require('chai');
const sinon = require('sinon');
const modelsales = require('../../../models/modelsales');
const connection = require('../../../models/connection');

describe('Busca todos as vendas no BD', () => {
    describe('quando não existe nenhuma venda', () => {
        const result = [[]];
        before(() => {
            sinon.stub(connection, 'execute').resolves(result);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
            const result = await modelsales.getSales();
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await modelsales.getSales();
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
        sinon.stub(connection, 'execute').resolves([result]);
     })
     after(() => {
         connection.execute.restore();
     })
     it('retorna um array', async () => {
        const result = await modelsales.getSales();
        expect(result).to.be.an('array');
     })
     it('o array não esta vazio', async () => {
        const result = await modelsales.getSales();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await modelsales.getSales();
        expect(result).to.be.an('object');
      })
      it('o objeto que esta no array contem os atributos saleId, date, productId, quantity', async () => {
        const [result] = await modelsales.getSales();
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
            sinon.stub(connection, 'execute').resolves(result);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
            const result = await modelsales.getSalesById(id);
            expect(result).to.be.an('array');
        })
        it('o array está vazio', async () => {
            const result = await modelsales.getSalesById(id);
            expect(result).to.be.empty;
        })
    })
    describe('Quando existe a venda com ID no meu banco', () => {
        const saleId = 1;
        const result = [
            {
                saleId: 1,
                date: "2022-05-07T01:12:42.000Z",
                productId: 1,
                quantity: 5
            },
         ]
        before(() => {
           sinon.stub(connection, 'execute').resolves([result]);
        })
        after(() => {
            connection.execute.restore();
        })
        it('retorna um array', async () => {
           const result = await modelsales.getSalesById(saleId);
           expect(result).to.be.an('array');
        })
        it('o array não esta vazio', async () => {
           const result = await modelsales.getSalesById(saleId);
           expect(result).to.be.not.empty;
         })
         it('o array possui objetos', async () => {
           const [result] = await modelsales.getSalesById(saleId);
           expect(result).to.be.an('object');
         })
         it('o objeto que esta no array contem os atributos saleId, date, productId, quantity', async () => {
            const [result] = await modelsales.getSalesById(saleId);
            expect(result).to.be.includes.all.keys(
              'saleId',
              'date',
              'productId',
              'quantity'
            )
          })
       })
})
describe("Testando a funcao createSales", () => {
    const resultObj = 
    {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 3
          }
        ]
      }
   
  
    before(() => {
      const execute = [{ id: 1 }];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando a venda é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const result = await modelsales.createSalesProducers(resultObj);
  
        expect(result).to.be.a("object");
      });
  
      it('tal objeto possui o "id" do novo filme inserido', async () => {
        const result = await modelsales.createSalesProducers(resultObj);
        expect(result).to.have.a.property("id");
      });
    });
  });

  describe("Testando a funcao createSalesProducers", () => {
    const resultObj = 
    {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 3
          }
        ]
      }
   
  
    before(() => {
      const execute = [{ id: 1 }];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando a venda é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const result = await modelsales.createSales(resultObj);
  
        expect(result).to.be.a("object");
      });
  
      it('tal objeto possui o "id" do novo filme inserido', async () => {
        const result = await modelsales.createSales(resultObj);
        expect(result).to.have.a.property("id");
      });
    });
  });
  describe("Testando a funcao getSalesAndProducts", () => {
    const resultObj = 
    {
        id: 1, 
      }
   
  
    before(() => {
      const execute = [{ id: 1 }];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando a venda é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const result = await modelsales.getSalesAndProducts(resultObj.id);
  
        expect(result).to.be.a("object");
      });
  
      it('tal objeto possui o "id" do novo filme inserido', async () => {
        const result = await modelsales.getSalesAndProducts(resultObj);
        expect(result).to.have.a.property("id");
      });
    });
  });
  describe("Testando a funcao updateSales", () => {
    const resultObj = 
    {
        id: 1, 
      }
   
  
    before(() => {
      const execute = [{ id: 1 }];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando a venda é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const result = await modelsales.updateSales(resultObj.id);
  
        expect(result).to.be.a("object");
      });
  
      it('tal objeto possui o "id" do novo filme inserido', async () => {
        const result = await modelsales.updateSales(resultObj);
        expect(result).to.have.a.property("id");
      });
    });
  });
 
describe("deleta uma venda no BD", () => {
  const resultObj = 1;
 const resultUpdate = [[]]

  before(() => {
    const execute = resultUpdate;

    sinon.stub(connection, "execute").resolves([execute]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando o produto é deletado com sucesso", async () => {
    it("retorna um objeto", async () => {
      const [result] = await modelsales.deleteSales(resultObj);

      expect(result).to.be.a("array");
    });

    it('tal produto não possui o "name"', async () => {
      const [result] = await modelsales.deleteSales(resultObj);
     
      expect(result).to.have.not.property("name");
    });
  });
});