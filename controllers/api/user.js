// modules
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtVerification = require('../../middleware/jwt-verification');
const User = require('../../models/User');

// register
// path - /api/user/register
router.post('/register', jwtVerification, async (request, response) => {
  // request data
  const { first_name, last_name, email, password } = request.body;
  console.log('hit register');
  // // check for existing user with email
  // const existingUser = await User.findOne(email);
  // // if user exists, stop registration, notify user of error
  // if (existingUser.length) return response.status(422).send('Error: user already exists');

  // create salt & hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // user registration data
  const userData = {
    hashedPassword,
    first_name,
    last_name,
    email
  };

  try {
    const newUser = await User.create(userData);
    const token = jwt.sign({ _id: newUser.insertId }, process.env.JWT_SECRET);
    
    response.cookie('Authorization', token, { httpOnly: true });
    response.sendStatus(200);
  } catch (error) {
    response.status(422).send('Error: new user account could not be created');
  }
});

// path - /api/user/login
router.post('/login', (request, response) => {
  response.send('You hit the login route');
});

module.exports = router;