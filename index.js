const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
const connection = require('./config/connection');

app.get('/', (request, response) => {
  response.send("Hello World");
});

app.listen(PORT, () => console.log('App running on PORT: ', PORT));