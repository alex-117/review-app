// modules
const router = require('express').Router();
const jwtVerification = require('../../middleware/jwt-verification');

// Handlebars Routes
router.get('/', jwtVerification, (request, response) => {
  return response.render('homepage');
});

router.get('/register', (request, response) => {
  return response.render('register');
});

module.exports = router;