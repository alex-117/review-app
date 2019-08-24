// modules
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtVerification = require('../../middleware/jwt-verification');
const User = require('../../models/User');

// register
// path - /api/user/register
router.post('/register', async (request, response) => {
  // request data
  const { first_name, last_name, email, password } = request.body;

  // check for existing user with email
  const existingUser = await User.findOne(email);
  // if user exists, stop registration, notify user of error
  if (existingUser.length) return response.status(422).send('Error: user already exists');

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
router.post('/login', async (request, response) => {
  // request data
  const { email, password } = request.body;

  // check if user exists with email
  const existingUser = await User.findOne(email);
  // if user is not found, stop login process, return error to user
  if (!existingUser.length) return response.status(422).send('Error: incorrect email or password');

  // if user does exist, compare passwords
  const validPassword = await bcrypt.compare(password, existingUser[0].password);
  if (!validPassword) return response.status(422).send('Error: incorrect email or password');

  // user exists & password is valid - create JWT
  const token = jwt.sign({ _id: existingUser[0].id }, process.env.JWT_SECRET);

  response.cookie('Authorization', token, { httpOnly: true });
  response.sendStatus(200);
});

// path - /api/user/logout
router.post('/logout', async (request, response) => {
  // handle logout of user
  // blacklist token 
  response.sendStatus(200);
});

module.exports = router;