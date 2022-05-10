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
describe("Insere um novo produto no BD", () => {
  describe("quando é inserido com sucesso", async () => {
    const produto = {
        name: "pc gamer ultra mega power",
        quantity: 10
    };

    before(() => {
      const ID_EXAMPLE = 1;
      sinon.stub(modelProducts, "createProducts").resolves({id: ID_EXAMPLE});
    });

    after(() => {
      modelProducts.createProducts.restore();
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await serviceproducts.validCreate(produto);

      expect(response).to.have.a.property("id");
    });
  });
//   describe("se aconteceu algum erro", async () => {
//     const produto = {
//       name: "pc gamer ultra mega power",
//       quantity: 10
//   };
//   const objErrorExists = {
//     error: 409,
//     message: 'Product already exists',
// };

//       before(() => {
//         sinon.stub(modelProducts, "getProducts").resolves(objErrorExists);
//       });
  
//       after(() => {
//         modelProducts.getProducts.restore();
//       });
  
//       it('verifica se houve algum erro ', async () => {
//         try{
//         await serviceproducts.validCreate({name: 'aira'});
//         } catch (err) {
//           expect(err.message).to.be.equal('Product already exists');
//         }
//       })
//     });
});


describe('Busca um products por ID especifico na camada model', () => {
    describe('Quando existe products com ID na minha camada model', () => {
        const id = 1;
        const result = 
           {
               id: 1,
               name: "Martelo de Thor",
               quantity: 10
           }
        
        before(() => {
           sinon.stub(modelProducts, 'getProductsById').resolves(result);
        })
        after(() => {
            modelProducts.getProductsById.restore();
        })
        it('o array não esta vazio', async () => {
           const result = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.not.empty;
         })
         it('o array possui objetos', async () => {
           const result = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.an('object');
         })
         it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
           const result = await serviceproducts.getProductsByIdServices(id);
           expect(result).to.be.includes.all.keys(
             'id',
             'name',
             'quantity',
           )
         })
       })

  describe("se aconteceu algum erro", async () => {
    const idError = 'ss';
      before(() => {
        sinon.stub(modelProducts, "getProductsById").resolves([[]]);
      });
  
      after(() => {
        modelProducts.getProductsById.restore();
      });
  
      it('verifica se houve algum erro ', async () => {
        try{
        await serviceproducts.getProductsByIdServices(idError);
        } catch (err) {
  
          expect(err.message).to.be.equal('Product not found');
        }
      })
    });
})
describe("atualiza um novo produto no BD", () => {
  describe("quando é atualizado com sucesso", async () => {
    const produto = {
        id: 1,
        name: "pc gamer ultra mega power",
        quantity: 10
    };

    before(() => {
      sinon.stub(modelProducts, "updateProducts").resolves(produto);
    });

    after(() => {
      modelProducts.updateProducts.restore();
    });

    it('o array possui objetos', async () => {
      const result = await serviceproducts.validUpdate(2);
      expect(result).to.be.an('object');
    })
    it('o objeto não esta vazio', async () => {
      const result = await serviceproducts.validUpdate(2);
      expect(result).to.be.not.empty;
    })
  });
  describe("se aconteceu algum erro", async () => {
    const idError = 'ss';
      before(() => {
        sinon.stub(modelProducts, "updateProducts").resolves([[]]);
      });
  
      after(() => {
        modelProducts.updateProducts.restore();
      });
  
      it('verifica se houve algum erro ', async () => {
        try{
        await serviceproducts.validUpdate(idError);
        } catch (err) {
  
          expect(err.message).to.be.equal('Product not found');
        }
      })
    });
});

describe("deleta um novo produto no BD", () => {
  describe("quando é deletado com sucesso", async () => {

    before(() => {
      sinon.stub(modelProducts, "deleteProducts").resolves(true);
    });

    after(() => {
      modelProducts.deleteProducts.restore();
    });

    it('verifica se houve a delete ', async () => {
      const result = await serviceproducts.validDelete(2);
      expect(result).to.be.equal(true);
    })
  });
  describe("se aconteceu algum erro", async () => {
  const idError = 'ss';
    before(() => {
      sinon.stub(modelProducts, "deleteProducts").resolves([[]]);
    });

    after(() => {
      modelProducts.deleteProducts.restore();
    });

    it('verifica se houve algum erro ', async () => {
      try{
      await serviceproducts.validDelete(idError);
      } catch (err) {

        expect(err.message).to.be.equal('Product not found');
      }
    })
  });
});
