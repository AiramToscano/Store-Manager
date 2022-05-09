const express = require('express');
const bodyParser = require('body-parser');

const { validNameUndefined,
  validNameLength,
  validQuantityUndefined,
  validQuantityLength,
  error } = require('./middlewares/middlewaresProducts');

const { validUndefinedSales,
  validQuantityLengthSales,
  erro } = require('./middlewares/middlewaresSales');
const { getProductsControler,
   getProductsIdControler, registerProduct } = require('./controllers/controllerproducts');
  
const { getSalesControler,
  getSalesIdControler } = require('./controllers/controllersales');

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
validNameLength, validQuantityUndefined, validQuantityLength);
app.post('/products', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength, registerProduct);
app.put('/sales/:id', validUndefinedSales,
validQuantityLengthSales, erro);
app.post('/sales', validUndefinedSales, 
validQuantityLengthSales, erro);
app.use(error);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
