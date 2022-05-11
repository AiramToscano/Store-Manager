const express = require('express');
const bodyParser = require('body-parser');

const { validNameUndefined,
  validNameLength,
  validQuantityUndefined,
  validQuantityLength } = require('./middlewares/middlewaresProducts');

const { validUndefinedSales,
  validQuantityLengthSales } = require('./middlewares/middlewaresSales');
const { getProductsControler,
   getProductsIdControler,
   registerProduct, updateProduct, deleteProduct } = require('./controllers/controllerproducts');
  
const { getSalesControler,
  getSalesIdControler, createSales, updateSales } = require('./controllers/controllersales');

const err = require('./middlewares/middlewareError');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', getProductsIdControler);
app.get('/sales/:id', getSalesIdControler);
app.get('/products', getProductsControler);
app.get('/sales', getSalesControler);
app.put('/products/:id', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength, updateProduct);
app.post('/products', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength, registerProduct);
app.put('/sales/:id', validUndefinedSales,
validQuantityLengthSales, updateSales);
app.post('/sales', validUndefinedSales, 
validQuantityLengthSales, createSales);
app.delete('/products/:id', deleteProduct);
app.use(err.error);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
