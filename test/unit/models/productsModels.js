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

describe("Insere um novo produto no BD", () => {
  const resultObj = 
    {
        name: "Martelo de Thor",
        quantity: 10
    }
 

  before(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando o produto é inserido com sucesso", async () => {
    it("retorna um objeto", async () => {
      const result = await modelproducts.createProducts(resultObj);

      expect(result).to.be.a("object");
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const result = await modelproducts.createProducts(resultObj);
      expect(result).to.have.a.property("id");
    });
  });
});

describe("Modifica um produto no BD", () => {
  const resultObj = [
    {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
    },
 ]
 const resultUpdate = [
  {
      name: "Machado de Thor",
      quantity: 10
  },
]

  before(() => {
    const execute = resultUpdate;

    sinon.stub(connection, "execute").resolves([execute]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando o produto é atualizado com sucesso", async () => {
    it("retorna um objeto", async () => {
      const [result] = await modelproducts.updateProducts(resultObj);

      expect(result).to.be.a("object");
    });

    it('tal produto possui o "name" do novo produto inserido', async () => {
      const [result] = await modelproducts.updateProducts(resultObj);
     
      expect(result).to.have.a.property("name");
    });
  });
});

describe("deleta um produto no BD", () => {
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
      const [result] = await modelproducts.deleteProducts(resultObj);

      expect(result).to.be.a("array");
    });

    it('tal produto não possui o "name"', async () => {
      const [result] = await modelproducts.deleteProducts(resultObj);
     
      expect(result).to.have.not.property("name");
    });
  });
});

describe("Modifica a quantidade de um produto no BD quando a uma venda", () => {
  const resultObj = [
    {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
    },
 ]
 const resultUpdate = [
  {
      name: "Machado de Thor",
      quantity: 10
  },
]

  before(() => {
    const execute = resultUpdate;

    sinon.stub(connection, "execute").resolves([execute]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando a quantidade é atualizado com sucesso", async () => {
    it("retorna um objeto", async () => {
      const [result] = await modelproducts.updateProductsQuantityCreate(resultObj);

      expect(result).to.be.a("object");
    });

    it('tal produto possui o "name" do novo produto inserido', async () => {
      const [result] = await modelproducts.updateProductsQuantityCreate(resultObj);
     
      expect(result).to.have.a.property("name");
    });
  });
});

describe("Modifica a quantidade de um produto no BD quando a um delete na venda", () => {
  const resultObj = [
    {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
    },
 ]
 const resultUpdate = [
  {
      name: "Machado de Thor",
      quantity: 10
  },
]

  before(() => {
    const execute = resultUpdate;

    sinon.stub(connection, "execute").resolves([execute]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando o produto é atualizado com sucesso", async () => {
    it("retorna um objeto", async () => {
      const [result] = await modelproducts.updateProductsQuantityDelete(resultObj);

      expect(result).to.be.a("object");
    });

    it('tal produto possui o "name" do novo produto inserido', async () => {
      const [result] = await modelproducts.updateProductsQuantityDelete(resultObj);
     
      expect(result).to.have.a.property("name");
    });
  });
});