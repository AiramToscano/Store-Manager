const express = require('express');
const bodyParser = require('body-parser');

const routeProduct = require('./routes/routeProduct');
const routeSales = require('./routes/routeSales');

const err = require('./middlewares/middlewareError');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', routeProduct);
app.use('/sales', routeSales);
app.use(err.error);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
