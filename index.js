require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3030;

// Serve content from 'public' for client browser
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// use routes last so all middleware can be set up first
app.use(require('./controllers'));

app.listen(PORT, () => console.log('App running on PORT: ', PORT));