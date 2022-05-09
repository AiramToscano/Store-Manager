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
   getProductsIdControler } = require('./controllers/controllerproducts');
  
const { getSalesControler,
  getSalesIdControler } = require('./controllers/controllersales');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.put('/products/:id', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength);
app.post('/products', validNameUndefined, 
validNameLength, validQuantityUndefined, validQuantityLength);
app.put('/sales/:id', validUndefinedSales,
validQuantityLengthSales, erro);
app.post('/sales', validUndefinedSales, 
validQuantityLengthSales, erro);
app.get('/products/:id', getProductsIdControler);
app.get('/products', getProductsControler);
app.get('/sales/:id', getSalesIdControler);
app.get('/sales', getSalesControler);
app.use(error);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
