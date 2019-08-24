const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3030;

dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// use routes last so all middleware can be set up first
app.use(require('./controllers'));

app.listen(PORT, () => console.log('App running on PORT: ', PORT));