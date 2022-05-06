const express = require('express');

const bodyParser = require('body-parser');
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

app.get('/products/:id', getProductsIdControler);
app.get('/products', getProductsControler);
app.get('/sales/:id', getSalesIdControler);
app.get('/sales', getSalesControler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
