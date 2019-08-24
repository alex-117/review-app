const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3030;

dotenv.config();
const connection = require('./config/connection');

app.get('/', (request, response) => {
  console.log("hit the root route");
  response.send("Hello World");
});

const routes = require('./controllers');
app.use(routes);

app.listen(PORT, () => console.log('App running on PORT: ', PORT));