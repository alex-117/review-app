// modules
const router = require('express').Router();

// register
// path - /api/user/register
router.post('/register', (request, response) => {
  console.log(request.body);
  // when a user hits the /register route
  // we want to create a new user
  response.send('You hit the register route');
});

// path - /api/user/login
router.post('/login', (request, response) => {
  response.send('You hit the login route');
});

module.exports = router;